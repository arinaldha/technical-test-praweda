import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JoiPipe } from 'nestjs-joi';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('/create')
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @Request() req) {
    const username = req.user.username ? req.user.username : null;
    return await this.employeesService.create(createEmployeeDto, username);
  }

  @Get('/findEmployee')
  async findEmployee(@Query(JoiPipe) query : FindEmployeeDto) {
    return await this.employeesService.findEmployee(query);
  }

  @Get()
  async findAll(@Query(JoiPipe) query: FindEmployeeDto) {
    return await this.employeesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.employeesService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Request() req,
  ) {
    const username = req.user.username ? req.user.username : null;
    return await this.employeesService.update(id, updateEmployeeDto, username);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string, @Request() req) {
    const username = req.user.username ? req.user.username : null;
    return await this.employeesService.remove(id, username);
  }
}
