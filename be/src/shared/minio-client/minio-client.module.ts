import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule, MinioService } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [
    MinioModule.register({
      endPoint: config.MINIO_ENDPOINT,
      port: +config.MINIO_PORT,
      useSSL: false, // If on localhost, keep it at false. If deployed on https, change to true
      accessKey: config.MINIO_ACCESSKEY,
      secretKey: config.MINIO_SECRETKEY,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
