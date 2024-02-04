import { Request, Response, NextFunction } from "express";
export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, currentUserId, existingUser"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};
