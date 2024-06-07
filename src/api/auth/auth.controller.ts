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
import { AddUserDTO, LoginDTO, paramDTO, paramEmailDTO, PreLoginDTO, RecoveryPasswordDTO, ResetPasswordDTO } from "./auth.dto";

const JWT_SECRET = 'my_jwt_secret';
const secret = speakeasy.generateSecret({ length: 20 });

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, 'username', 'password');
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

      await userService.sendOtpToken(req.body.username, tempToken);
      await userService.setOtpToken(req.body.username, tempToken);

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
    const tokenValidates = await userService.verifyOtpToken(req.body.username, req.body.token);

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

    await userService.update(userId!, newPassword, oldPassword);

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

export const confirmAccount = async (
  req: TypedRequest<any, any, paramDTO>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  console.log(id);
  const message = await userService.changeConfirmed(id);
  res.json(message);
}


export const recoveryPasswordEmail = async (
  req: TypedRequest<any, any, paramEmailDTO>,
  res: Response,
  next: NextFunction
) => {
  const email = req.params.email;
  const message = await userService.recoveryPasswordEmail(email);
  res.json(message);
}

export const recoveryPassword = async (
  req: TypedRequest<RecoveryPasswordDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.username;
    const { password, confPassword } = req.body;
    const recoveryToken = req.body.recoveryToken;
    if (password !== confPassword) {
      throw new WrongPasswordError();
    }
    const message = await userService.recoveryPassword(email, password, recoveryToken);
    res.json(message);
  } catch (err) {
    if (err instanceof WrongPasswordError) {
      res.status(400);
      res.json({
        error: 'PasswordValidationError',
        message: 'Password errata',
      });
    } else {
      next(err);
    }
  }
}