import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class MetaPaginationDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit: number = 20;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  total_data_page: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  total_data: number;
}
