import { Request, Response, NextFunction } from "express";

export const fn = (req: Request, res: Response, next: NextFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
