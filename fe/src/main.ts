import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { extractMessages } from './shared/utils/tools';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('TECHNICAL TEST DOCUMENT')
    .setDescription('TECHNICAL TEST API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = extractMessages(errors);
        return new BadRequestException(messages);
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  SwaggerModule.setup('', app, document);

  await app.listen(process.env.APP_PORT || 5000);
}
bootstrap();
