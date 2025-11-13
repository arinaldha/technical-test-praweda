import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { Transform } from 'class-transformer';

export class FindAllCompaniesDto {
  @ApiPropertyOptional()
  @JoiSchema(Joi.optional().default(''))
  search?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @JoiSchema(Joi.string().default(''))
  order_by: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @JoiSchema(Joi.number())
  page: number = 1;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @JoiSchema(Joi.number())
  limit: number = 20;
}
