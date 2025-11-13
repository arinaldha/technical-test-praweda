import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth';
import { ValidationExceptionFilter } from './validation-exception.filter';
import { EmployeesModule } from './employees/employees.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot(),
    PrismaModule,
    EmployeesModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule {}
