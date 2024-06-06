import { IsEmail, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class AddUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  username: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  password: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  confPassword: string;
}

export class PreLoginDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class LoginDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  token: string;
}

export class ResetPasswordDTO {
  @IsString()
  oldPassword: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  newPassword: string;
}

export class RecoveryPasswordDTO {

  @IsEmail()
  username: string;

  @IsString()
    recoveryToken: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  password: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/, {
    message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  })
  confPassword: string;
}

export class paramDTO{

  @IsString()
  id:string;
}

export class paramEmailDTO{

  @IsEmail()
  email:string;

}
