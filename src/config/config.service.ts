import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.service.interface';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error('[ConfigService] Can not read config file');
    } else {
      this.logger.log('[ConfigService] Env configuration was loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }
  get(key: string): string {
    return this.config[key];
  }
}
