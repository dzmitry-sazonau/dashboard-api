import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../error/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.service.interface';
import { IUsersController } from './users.controller.interface';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
    super(loggerService);
    this.bindRoutes([
      {
        method: 'post',
        path: '/login',
        func: this.login,
      },
      {
        method: 'post',
        path: '/register',
        func: this.register,
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    // this.ok(res, 'login');
    next(new HttpError(401, 'Auth Error', 'login'));
  }

  register(req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'register');
  }
}
