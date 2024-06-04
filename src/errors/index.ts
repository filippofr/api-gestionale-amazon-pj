import { genericErrorHandler } from "./generic";
import { notFoundHandler } from "./not-found";
import { userExistsHandler } from "./user-exists";
import { validationErrorHandler } from "./validation";
import { WrongPasswordHandler } from "./wrong-password";

export const errorHandlers = [
  notFoundHandler,
  userExistsHandler,
  validationErrorHandler,
  WrongPasswordHandler,
  genericErrorHandler
];