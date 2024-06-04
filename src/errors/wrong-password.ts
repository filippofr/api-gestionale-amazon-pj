import { NextFunction, Request, Response } from "express";

export class WrongPasswordError extends Error {
  constructor() {
    super();
    this.name = 'WrongPasswordError';
    this.message = 'Password is incorrect';
  }
}

export const WrongPasswordHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof WrongPasswordError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
}