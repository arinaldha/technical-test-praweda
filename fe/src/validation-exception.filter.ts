import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { PrismaService } from './prisma/prisma.service';
import { getJakartaTime, JSONStringify } from './shared/utils/tools';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private prisma: PrismaService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const validationErrors = exception.getResponse();

    const routeUrl = request.originalUrl;

    const startDate = getJakartaTime();

    const services = {
      createinvoicedelivery: 'create-invoice-delivery',
      createinvoicereceiving: 'create-invoice-receiving',
      createinvoicecancelloadgatein: 'create-invoice-cancel-load-gatein',
      createinvoicecancelloaddelivery: 'create-invoice-cancel-load-delivery',
      createinvoicedeliveryext: 'create-invoice-delivery-ext',
      getnota: 'get-nota',
      getfaktur: 'get-faktur',
      listnotabyproformanumber: 'list-nota-by-proforma-number',
    };
    const splittedUrl = routeUrl.split('/');

    // await this.prisma.billing_integration_logs.create({
    //   data: {
    //     message: JSONStringify(validationErrors),
    //     request_payload: JSONStringify(request.body),
    //     response_payload: JSONStringify(validationErrors),
    //     service: services[splittedUrl[2]],
    //     url: routeUrl,
    //     origin_payload: 'Y',
    //     pranota_number: '',
    //     request_date: startDate,
    //     response_date: getJakartaTime(),
    //   },
    // });

    response.status(status).json(validationErrors);
  }
}
