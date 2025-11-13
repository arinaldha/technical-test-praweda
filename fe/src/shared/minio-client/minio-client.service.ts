import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';
import { ResponseError } from '../utils/response-ststus';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = process.env.MINIO_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  public async uploadFile(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    if (
      !(
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('png') ||
        file.mimetype.includes('svg') ||
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('pdf') ||
        file.mimetype.includes('application/vnd.ms-excel') ||
        file.mimetype.includes(
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
      )
    ) {
      throw ResponseError(
        'file mime type not allowed for this action ' + file.mimetype,
        HttpStatus.BAD_REQUEST,
      );
    }
    let temp_filename = Date.now().toString();
    let hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    let filename = hashedFileName + ext;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket, fileName, fileBuffer);

    return {
      url:
        'https://' +
        `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT_URL}/${baseBucket}/${filename}`,
    };
  }

  //upload file url
  public async uploadBuffer(
    data,
    file: string,
    baseBucket: string = this.baseBucket,
  ) {
    let filename = file;
    const fileBuffer = data;
    this.client.putObject(baseBucket, filename, fileBuffer);

    return {
      url:
        'https://' +
        `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT_URL}/${baseBucket}/${filename}`,
    };
  }
}
