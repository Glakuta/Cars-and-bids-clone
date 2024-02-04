import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "crypto";
import catchAsync from "../utils/catchAsync";
import { User, UserInterface } from "../models/user";
import AppError from "../utils/appError";
import { sendEmail } from "../utils/email";
import { resolveSoa } from "dns";

interface AuthRequest extends Request {
  user?: UserInterface | undefined;
}

interface DecodedToken {
  id: string;
  iat: Date;
  // Add other properties if needed
}
const isUserDefined = (
  req: AuthRequest
): req is AuthRequest & { user: UserInterface } => {
  return Boolean(req.user);
};
const verify = promisify(jwt.verify);

const signToken = (_id: string) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ _id }, jwtSecret, {
    expiresIn: process.env.JWT_SECRET_EXPIRES,
  });
};

const createSendToken = (
  user: UserInterface,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user.id);
  const expiresIn = process.env.JWT_COOKIE_EXPIRES
    ? new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
      )
    : undefined;

  const cookieOptions = {
    expires: expiresIn,
    httpOnly: true,
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = "";

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);

    res.status(201).json({
      status: "Success",
      data: {
        data: newUser,
      },
    });
  }
);

export const sendVerifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is no user with this email", 401));
    }

    const verifyToken = user.createEmailVerificationToken();
    const verifyUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/verifyEmail/${verifyToken}`;

    const message = `Please verify your email. Click link below \n ${verifyUrl}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token",
        message,
      });

      await user.verifyEmail(verifyToken);

      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      user.createEmailVerificationToken = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError("There was an error sending email, try again!", 500)
      );
    }
  }
);

// export const verifyEmail = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {}
// );

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, passwordConfirm } = req.body;
    if (!email || !password || !passwordConfirm) {
      return next(new AppError("Please provide data", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("There is no such user", 401));
    }
    const correct = await User.correctPassword(password, user.password);
    if (!correct) {
      return next(new AppError("Wrong email or password", 401));
    }

    createSendToken(user, 200, res);
  }
);

export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET;
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError(
          "You have no permission to view this page, please log in",
          400
        )
      );
    }

    const decoded = (await jwt.verify(token, jwtSecret!)) as any;

    const currentUser = await User.findById({
      _id: decoded._id,
    }).select("+passwordChangedAt");
    console.log(currentUser);
    if (!currentUser) {
      return next(new AppError("There is no user with this id", 403));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401
        )
      );
    }
    req.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: Array<string>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!isUserDefined(req)) {
      return next(new AppError("User is not defined", 500));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

export const forgotPassword = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is no user with this email", 401));
    }

    const resetToken = user.createResetPasswordToken();
    console.log(resetToken);
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot password? Click link below \n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token",
        message,
      });

      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiredAt = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError("There was an error sending email, try again!", 500)
      );
    }
  }
);

export const resetPassword = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const hashedToken = createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    console.log(req.params.token);

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordTokenExpiredAt: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordChangedAt = undefined;
    user.resetPasswordTokenExpiredAt = undefined;
    await user.save();

    const token = signToken(user.id);

    res.status(201).json({
      status: "Success",
      token,
    });
  }
);

export const updatePassword = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log(req.user);
    const user = await User.findById(req.user?.id).select("+password");
    if (
      !(await User.correctPassword(req.body.passwordCurrent, user!.password))
    ) {
      return next(new AppError("Your current password is wrog!", 401));
    }

    user!.password = req.body.password;
    user!.passwordConfirm = req.body.passwordConfirm;
    await user!.save();

    const token = signToken(user!.id);

    res.status(201).json({
      status: "Success",
      token,
    });
  }
);
