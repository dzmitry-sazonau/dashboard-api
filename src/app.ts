import express, { Express } from 'express';
import { Server } from 'http';
import { IUsersController } from './users/users.controller.interface';
import { ILoggerService } from './logger/logger.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExceptionFilter } from './error/exception.filter.interface';
import 'reflect-metadata';
import { json } from 'body-parser';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILoggerService) private logger: ILoggerService,
    @inject(TYPES.IUsersController) private userController: IUsersController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRouter(): void {
    this.app.use('/users', this.userController.router);
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useExceptionFilter(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRouter();
    this.useExceptionFilter();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
