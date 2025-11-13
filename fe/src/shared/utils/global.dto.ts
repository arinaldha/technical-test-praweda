import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { Transform } from 'class-transformer';
import { OrderSortType, PaginationType, SearchAdvance } from './types';

export class GlobalSearchDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @JoiSchema(Joi.string().required().valid('all', 'spesific'))
  type: 'all' | 'spesific';

  @ApiProperty()
  @IsArray()
  @JoiSchema(
    Joi.array()
      .items(
        Joi.object({
          dependency_id: Joi.string().required(),
          dependency_value: Joi.string().required(),
          operator: Joi.string().required(),
        }),
      )
      .required()
      .min(
        Joi.ref('type', {
          adjust: (value) => (value === 'spesific' ? 1 : 0),
        }),
      ),
  )
  advanced_search: SearchAdvance[];

  @ApiProperty()
  @IsObject()
  @JoiSchema(
    Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
    }),
  )
  pagination: PaginationType;

  @ApiProperty()
  @IsObject()
  @JoiSchema(
    Joi.object({
      dependency_id: Joi.string().optional(),
      type: Joi.string().valid('asc', 'desc').optional(),
    }),
  )
  order: OrderSortType;
}

export class DefaultSearchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().default('').optional())
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @JoiSchema(Joi.number().optional())
  page: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @JoiSchema(Joi.number().optional())
  limit: number = 20;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @JoiSchema(Joi.string().default(''))
  order_by: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @JoiSchema(Joi.string().default(''))
  order_by_key: string;
}
