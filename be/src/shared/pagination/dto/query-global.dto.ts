import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class QueryGlobalDto {
  @JoiSchema(Joi.number().optional())
  limit?: number;

  @JoiSchema(Joi.number().optional())
  page?: number;

  @JoiSchema(Joi.string().optional())
  search?: string;
}
