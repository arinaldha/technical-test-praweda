import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseError } from 'src/shared/utils/response-ststus';
import { searchType } from 'src/shared/utils/constant';
import {
  findDataModule,
  generateConditions,
} from 'src/shared/utils/advance-search';
import { getJakartaTime } from 'src/shared/utils/tools';
import { Prisma } from '@prisma/client';
import { getMeta, getOffset } from 'src/shared/pagination/pagination.utils';

@Injectable()
export class EmployeesService {
  private moduleName = 'employees';
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto, username: string) {
    try {
      const { code, name } = createEmployeeDto;

      const isExist = await this.prisma.employees.findFirst({
        where: {
          code,
          deleted_at: null,
        },
      });

      if (isExist) {
        return ResponseError(
          'Employee code already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const employee = await this.prisma.employees.create({
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
        message: 'Create Employee Successfuly',
        data: {
          employee_id: employee.id,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message ?? err).getResponse();
    }
  }

    async findEmployee(query){
    try {
        const {search, page =1 , limit = 20} = query
        const { skip, take } = await getOffset(page, limit);

        const whereConditions: Prisma.employeesWhereInput = {}

        if(search){
          whereConditions.OR = [
            {code :  {contains : search, mode : "insensitive"}},
            {name :  {contains : search, mode : "insensitive"}},
          ]
        }

        whereConditions.deleted_at = null

        const [result, count] = await this.prisma.$transaction([
            this.prisma.employees.findMany({
                where: whereConditions,
                orderBy: {
                  created_at: 'asc'
              },
                skip : skip,
                take : take,
                select: {
                  id: true,
                  code: true,
                  name: true,
                },
            }),
            this.prisma.employees.count({
                where: whereConditions
            })
        ])

        const meta = getMeta(page, limit, count);
        
        return {
            success: true,
            status: HttpStatus.OK,
             message: 'successfully',
             data: result,
             meta: meta
        }
        
    } catch (err) {
        console.log(err)
        throw new InternalServerErrorException('find employee failed caused by '+ typeof err === "object" ? err.message : err).getResponse()
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
      const result = await this.prisma.employees.findUnique({
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
        'find employee failed caused by ' + typeof error === 'object'
          ? error.message
          : error,
      ).getResponse();
    }
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
    username: string,
  ) {
    try {
      if (!id) {
        return ResponseError(
          'unknown id data',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const { code, name } = updateEmployeeDto;

      const isExist = await this.prisma.employees.findFirst({
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
          'Employee code already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const employee = await this.prisma.employees.update({
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
        message: 'Update Employee Successfuly',
        data: {
          employee_id: employee.id,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'Update employee failed caused by ' + typeof err === 'object'
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

      const find = await this.prisma.employees.findUnique({
        where: {
          id: id,
          deleted_at: null,
        },
        select: { id: true },
      });

      if (!find) {
        return ResponseError('unknown id data', HttpStatus.BAD_REQUEST);
      }

      await this.prisma.employees.update({
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
        message: 'remove employee successfuly',
        data: {},
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'remove employee failed caused by ' + typeof error === 'object'
          ? error.message
          : error,
      ).getResponse();
    }
  }
}
