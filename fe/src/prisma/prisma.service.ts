import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'pretty',
    });

    // @ts-ignore
    this.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Params: ' + event.params);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async onModuleInit() {}

  async enableShutdownHooks(app: INestApplication) {}
}
