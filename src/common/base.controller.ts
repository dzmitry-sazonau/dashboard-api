import { LoggerService } from "../logger/logger.service";
import { Router, Response } from "express";
import { IControllerRoute } from "./route.interface";

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public created(res: Response) {
    res.sendStatus(201)
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(response: Response, message: T) {
    return this.send<T>(response, 200, message);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      const handler = route.func.bind(this);

      this.logger.log(`[${route.method}] ${route.path}`);
      this.router[route.method](route.path, handler)
    }
  }
}