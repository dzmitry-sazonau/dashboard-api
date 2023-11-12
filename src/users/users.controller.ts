import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { NextFunction, Request, Response } from "express";
import {HttpError} from "../error/http-error.class";

export class UsersController extends BaseController {

  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {
        method: 'post',
        path: '/login',
        func: this.login
      },
      {
        method: 'post',
        path: '/register',
        func: this.register
      },
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    // this.ok(res, 'login');
    next(new HttpError(401, 'Auth Error', 'login'))
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }
}