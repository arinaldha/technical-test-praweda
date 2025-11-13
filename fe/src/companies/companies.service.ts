import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseError } from 'src/shared/utils/response-ststus';
import { getJakartaTime } from 'src/shared/utils/tools';
import { searchType } from 'src/shared/utils/constant';
import {
  findDataModule,
  generateConditions,
} from 'src/shared/utils/advance-search';
import { getMeta, getOffset } from 'src/shared/pagination/pagination.utils';

@Injectable()
export class CompaniesService {
  private moduleName = 'companies';
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto, username: string) {
    try {
      const { code, name } = createCompanyDto;

      const isExist = await this.prisma.companies.findFirst({
        where: {
          code,
          deleted_at: null,
        },
      });

      if (isExist) {
        return ResponseError(
          'Company code already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const company = await this.prisma.companies.create({
        data: {
          code,
          name,
          created_by: username,
          created_at: getJakartaTime(),
        },
        select: {
          id: true,
          code: true,
          name: true,
        },
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Create Company Successfuly',
        data: {
          company_id: company.id,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message ?? err).getResponse();
    }
  }

  async findCompany(query) {
    try {
      const { search, page = 1, limit = 20 } = query;
      const { skip, take } = await getOffset(page, limit);

      const [result, count] = await this.prisma.$transaction([
        this.prisma.companies.findMany({
          where: {
            OR: [
              { name: { contains: search ?? '', mode: 'insensitive' } },
              { code: { contains: search ?? '', mode: 'insensitive' } },
            ],
            deleted_at: null,
          },
          orderBy: {
            created_at: 'desc',
          },
          skip: skip,
          take: take,
          select: {
            id: true,
            code: true,
            name: true,
          },
        }),
        this.prisma.companies.count({
          where: {
            OR: [
              { name: { contains: search ?? '', mode: 'insensitive' } },
              { code: { contains: search ?? '', mode: 'insensitive' } },
            ],
            deleted_at: null,
          },
        }),
      ]);

      const meta = getMeta(page, limit, count);

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'successfully',
        data: result,
        meta: meta,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'find company failed caused by ' + typeof err === 'object'
          ? err.message
          : err,
      ).getResponse();
    }
  }

  async findAll(body) {
    try {
      const { type, advanced_search, pagination, order } = body;

      if (!searchType.includes(type)) {
        return new BadRequestException(`Unknown type ${type}`).getResponse();
      }

      const conditions = await generateConditions(
        type,
        advanced_search,
        this.moduleName,
        this.prisma,
      );

      const result = await findDataModule(
        conditions,
        order,
        pagination,
        this.prisma,
        this.moduleName,
        {
          code: true,
          name: true,
        },
      );

      return {
        status: HttpStatus.OK,
        message: 'success',
        ...result,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('find data failed').getResponse();
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        return ResponseError(
          'unknown id data',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const result = await this.prisma.companies.findUnique({
        where: {
          id,
          deleted_at: null,
        },
        select: {
          id: true,
          code: true,
          name: true,
        },
      });

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'find company failed caused by ' + typeof error === 'object'
          ? error.message
          : error,
      ).getResponse();
    }
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    username: string,
  ) {
    try {
      if (!id) {
        return ResponseError(
          'unknown id data',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const { code, name } = updateCompanyDto;

      const isExist = await this.prisma.companies.findFirst({
        where: {
          code,
          NOT: {
            id,
          },
          deleted_at: null,
        },
      });

      if (isExist) {
        return ResponseError(
          'Company code already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const company = await this.prisma.companies.update({
        where: {
          id,
        },
        data: {
          code,
          name,
          updated_by: username,
          updated_at: getJakartaTime(),
        },
        select: { id: true, code: true, name: true },
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Update Company Successfuly',
        data: {
          company_id: company.id,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'Update company failed caused by ' + typeof err === 'object'
          ? err.message
          : err,
      ).getResponse();
    }
  }

  async remove(id: string, username: string) {
    try {
      if (!id) {
        return ResponseError(
          'unknown id data',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const find = await this.prisma.companies.findUnique({
        where: {
          id: id,
          deleted_at: null,
        },
        select: { id: true },
      });

      if (!find) {
        return ResponseError('unknown id data', HttpStatus.BAD_REQUEST);
      }

      await this.prisma.companies.update({
        where: {
          id: id,
        },
        data: {
          deleted_at: getJakartaTime(),
          deleted_by: username,
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'remove company successfuly',
        data: {},
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'remove company failed caused by ' + typeof error === 'object'
          ? error.message
          : error,
      ).getResponse();
    }
  }
}
