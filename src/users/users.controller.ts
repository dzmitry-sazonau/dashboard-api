import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.service.interface';
import { IUsersController } from './users.controller.interface';
import 'reflect-metadata';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersService } from './users.service.interface';
import { HttpError } from '../error/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IUsersService) private usersService: IUsersService,
  ) {
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
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    this.ok(res, 'login');
    // next(new HttpError(401, 'Auth Error', 'login'));
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.createUser(body);

    if (!result) {
      return next(new HttpError(422, 'User already exist', 'UsersController'));
    }

    this.ok(res, { email: result.email, name: result.name, id: result.id });
  }
}
