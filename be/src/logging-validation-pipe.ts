import {
  ValidationPipe,
  ValidationError,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';

export class LoggingValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        const response: any = error.getResponse();
        const errors: ValidationError[] = response.message || [];

        const logDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }

        const today = moment().format('YYYY-MM-DD');
        const logFile = path.join(logDir, `validation-${today}.log`);

        const logData = {
          timestamp: new Date().toISOString(),
          target: metadata?.metatype?.name || 'UnknownDTO',
          value,
          errors,
        };

        fs.appendFileSync(logFile, JSON.stringify(logData) + '\n', 'utf8');
      }
      throw error;
    }
  }
}
