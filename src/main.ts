import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { ExceptionFilter } from "./error/exception.filter";
import {Container, ContainerModule, interfaces} from "inversify";
import {ILoggerService} from "./logger/logger.service.interface";
import {TYPES} from "./types";
import { IExceptionFilter } from "./error/exception.filter.interface";
import { IUsersController } from "./users/users.controller.interface";

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<IUsersController>(TYPES.IUsersController).to(UsersController);
  bind<App>(TYPES.Application).to(App);
})

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBinding);

  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { appContainer, app }
}

export const { app, appContainer } = bootstrap();
