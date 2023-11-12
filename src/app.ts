import express, { Express } from "express";
import { Server } from 'http'
import { LoggerService } from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./error/exception.filter";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UsersController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: LoggerService,
    userController: UsersController,
    exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
  }

  useRouter() {
    this.app.use('/users', this.userController.router)
  }

  useExceptionFilter() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  public async init() {
    this.useRouter();
    this.useExceptionFilter();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server running on http://localhost:${this.port}`)
    });

  }

}