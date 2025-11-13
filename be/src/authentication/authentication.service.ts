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
        email,
        phone,
        address,
        city_id,
        province_id,
        country_id,
        password,
        employee_id,
        user_companies,
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

      await this.prisma.$transaction(async (prisma) => {
        const newUser = await prisma.users.create({
          data: {
            name,
            username,
            email,
            phone,
            address,
            employee_id,
            password: hashedPassword,
            city: { connect: { id: city_id } },
            province: { connect: { id: province_id } },
            country: { connect: { id: country_id } },
          },
        });

        for (const user of user_companies) {
          await prisma.user_companies.create({
            data: {
              user_id: newUser.id,
              company_id: user.company_id,
              position_id: user.position_id,
            },
          });
        }

        return { data: { id: newUser.id } };
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        error.message ?? error,
      ).getResponse();
    }
  }
}
