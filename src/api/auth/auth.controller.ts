import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { omit, pick } from 'lodash';
import passport from "passport";
import speakeasy from 'speakeasy';
import { UserExistsError } from "../../errors/user-exists";
import { WrongPasswordError } from "../../errors/wrong-password";
import { TypedRequest } from "../../utils/typed-request.interface";
import ipAddressService from "../ip-users/ip.service";
import userService from '../user/user.service';
import { AddUserDTO, LoginDTO, PreLoginDTO, ResetPasswordDTO } from "./auth.dto";

const JWT_SECRET = 'my_jwt_secret';
const secret = speakeasy.generateSecret({ length: 20 });

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, 'username', 'password', 'confPassword');
    const { password, confPassword } = req.body;
    if (password !== confPassword) {
      throw new WrongPasswordError();
    }
    const credentials = pick(req.body, 'username', 'password');
    const newUser = await userService.add(userData, credentials);
    res.send(newUser);

  } catch (err) {
    if (err instanceof UserExistsError) {
      res.status(400);
      res.json(err.message);
    } else {
      next(err);
    }
  }
}

export const pre_login = async (
  req: TypedRequest<PreLoginDTO>,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      console.log(user)
      if (!user) {
        res.status(401);
        res.json({
          error: 'LoginError',
          message: info.message
        });
        return;
      }
      // TODO: associare il token allo user
      const tempToken = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
      });

      await userService.sendEmail(req.body.username, tempToken);

      res.status(200);
      res.json({
        user
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
}

export const login = async (
  req: TypedRequest<LoginDTO>,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      await ipAddressService.add(req.ip, "Login rifiutato");
      return next(err);
    }
    console.log(user)
    if (!user) {
      res.status(401);
      res.json({
        error: 'LoginError',
        message: info.message
      });
      await ipAddressService.add(req.ip, "Login Rifiutato");
      return;
    }
    const tokenValidates = speakeasy.totp.verify({
      secret: secret.base32,
      encoding: 'base32',
      token: req.body.token,
      window: 6
    });

    if (!tokenValidates) {
      res.status(401);
      res.json({
        error: 'LoginError',
        message: 'Codice di verifica non valido'
      });
      await ipAddressService.add(req.ip, "Login Rifiutato");
      return;
    }

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7 days' });
    res.status(200);
    res.json({
      user,
      token
    });
    await ipAddressService.add(req.ip, "Login accettato");
  })(req, res, next);
}

export const resetPassword = async (
  req: TypedRequest<ResetPasswordDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      res.status(400);
      res.json({
        error: 'PasswordValidationError',
        message: 'New password must be different from the last one',
      });
      await ipAddressService.add(req.ip, "Reset password rifiutato");
      return;
    }
    if (!req.user) {
      await ipAddressService.add(req.ip, "Reset password rifiutato");
      return res.status(404).json({ message: 'User not found' });
    }

    const modifiedUser = await userService.update(userId!, newPassword, oldPassword);


    res.status(200);
    res.json({
      message: 'Password changed'
    });
    await ipAddressService.add(req.ip, "Reset password accettato");
  } catch (err) {
    if (err instanceof WrongPasswordError) {
      res.status(400);
      // res.send(err.message);
      res.json({
        error: 'PasswordValidationError',
        message: 'Password errata',
      });
      await ipAddressService.add(req.ip, "Reset password rifiutato");
    } else {
      await ipAddressService.add(req.ip, "Reset password rifiutato");
      next(err);
    }
  }

}