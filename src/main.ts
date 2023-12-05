import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './error/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILoggerService } from './logger/logger.service.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './error/exception.filter.interface';
import { IUsersController } from './users/users.controller.interface';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<IUsersController>(TYPES.IUsersController).to(UsersController);
  bind<IUsersService>(TYPES.IUsersService).to(UsersService);
  bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBinding);

  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
