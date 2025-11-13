import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';
import {} from 'crypto';
import * as _ from 'lodash';
import { ResponseError } from 'src/shared/utils/response-ststus';
import * as moment from 'moment';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { decryptPwd } from 'src/shared/utils/hash';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(private readonly prisma: PrismaService) {}

  async loginService(body) {
    try {
      const { username, password } = body;

      const isUser = await this.prisma.users.findFirst({
        where: {
          username: username,
          deleted_at: null,
        },
        include: {
          user_roles: { select: { role: { select: { name: true } } } },
          user_companies: { select: { companies: { select: { name: true } } } },
        },
      });

      if (!isUser) {
        return ResponseError(
          'Username/Password not match',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const comparePwd = await bcrypt.compare(
        decryptPwd(password),
        isUser.password,
      );

      if (!comparePwd) {
        return ResponseError(
          'Username/Password not match',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const keyToken = uuid();
      const mappedRoles = isUser.user_roles.map((ur) => ur.role.name);
      const mappedCompanies = isUser.user_companies.map(
        (uc) => uc.companies.name,
      );
      const accessToken = jwt.sign(
        {
          id: isUser.id,
          username: isUser.username,
          key_token: keyToken,
          roles: mappedRoles,
          companies: mappedCompanies,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.EXPIRED_IN,
        },
      );

      return {
        id: isUser.id,
        access_token: accessToken,
        roles: mappedRoles,
        companies: mappedCompanies,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err.message ?? err).getResponse();
    }
  }

  async registerService(body: RegisterAuthDto) {
    try {
      const {
        name,
        username,
        position_id,
        roles,
        companies,
        email,
        phone,
        address,
        city_id,
        province_id,
        country_id,
        password,
      } = body;

      const isExist = await this.prisma.users.findFirst({
        where: {
          email: email,
          deleted_at: null,
        },
        select: { id: true },
      });

      if (isExist) {
        return ResponseError(
          'Email already registered',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisma.users.create({
        data: {
          name,
          username,
          email,
          phone,
          address,
          city_id,
          province_id,
          country_id,
          position_id,
          password: hashedPassword,
          user_roles: {
            create: roles.map((roleId) => {
              return { role_id: roleId };
            }),
          },
          user_companies: {
            create: companies.map((companyId) => {
              return { company_id: companyId };
            }),
          },
        },
      });

      return { data: { id: newUser.id } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        error.message ?? error,
      ).getResponse();
    }
  }
}
