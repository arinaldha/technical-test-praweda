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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JoiPipe } from 'nestjs-joi';
import { ApiTags } from '@nestjs/swagger';
import { FindAllCompaniesDto } from './dto/find-companies.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post('/create')
  async create(@Body() createCompanyDto: CreateCompanyDto, @Request() req) {
    const username = req.user.username ? req.user.username : null;
    return await this.companiesService.create(createCompanyDto, username);
  }

  @Get('/findCompany')
  async findCompany(@Query(JoiPipe) query: FindAllCompaniesDto) {
    return await this.companiesService.findCompany(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companiesService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Request() req,
  ) {
    const username = req.user.username ? req.user.username : null;
    return await this.companiesService.update(id, updateCompanyDto, username);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string, @Request() req) {
    const username = req.user.username ? req.user.username : null;
    return await this.companiesService.remove(id, username);
  }
}
