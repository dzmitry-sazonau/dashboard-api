import { Router, Response } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILoggerService } from '../logger/logger.service.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILoggerService) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public created(res: Response): void {
    res.sendStatus(201);
  }

  public send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(response: Response, message: T): ExpressReturnType {
    return this.send<T>(response, 200, message);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      const handler = route.func.bind(this);

      this.logger.log(`[${route.method}] ${route.path}`);
      this.router[route.method](route.path, handler);
    }
  }
}
