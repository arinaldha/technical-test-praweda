import { Controller, Post, Body, HttpCode, Get, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/shared/utils/constant';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body(JoiPipe) body: LoginAuthDto) {
    return await this.authenticationService.loginService(body);
  }

  @Public()
  @HttpCode(200)
  @Post('register')
  async register(@Body(JoiPipe) body: RegisterAuthDto) {
    return await this.authenticationService.registerService(body);
  }
}
