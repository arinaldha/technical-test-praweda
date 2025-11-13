import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

class UserCompanies {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  position_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  company_id: string;
}

export class RegisterAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  employee_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  username: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @JoiSchema(Joi.array().items(Joi.string()).required())
  roles: string[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @JoiSchema(Joi.array().items(Joi.string()).required())
  companies: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required().email())
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  city_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  province_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  country_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @JoiSchema(Joi.string().required())
  password: string;

  @ApiProperty({ type: [UserCompanies] })
  @IsArray()
  @IsNotEmpty()
  @JoiSchema(
    Joi.array()
      .items(
        Joi.object({
          position_id: Joi.string().required(),
          company_id: Joi.string().required(),
        }),
      )
      .required(),
  )
  user_companies: UserCompanies[];
}
