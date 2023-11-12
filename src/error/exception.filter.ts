
import { NextFunction, Request, Response } from "express";
import { IExceptionFilter } from "./exception.filter.interface";
import { HttpError } from "./http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILoggerService } from "../logger/logger.service.interface";
import "reflect-metadata";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {}

  catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
      this.logger.error(`[${err.context}] Error ${err.statusCode}: ${err.message}`)
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`)
      res.status(500).send({ err: err.message });
    }
  }
}
