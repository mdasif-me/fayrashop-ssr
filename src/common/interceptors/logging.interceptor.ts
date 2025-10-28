import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LoggerService } from '../../logger/logger.service';

/**
 * logging Interceptor - logs all incoming requests and outgoing responses
 * including method, URL, status code, and response time
 * also logs errors if they occur during request processing
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const body = request.body as Record<string, unknown>;
    const now = Date.now();

    this.logger.log(`Incoming Request: ${method} ${url}`, 'LoggingInterceptor');
    if (body && typeof body === 'object' && Object.keys(body).length > 0) {
      this.logger.debug(
        `Request Body: ${JSON.stringify(body)}`,
        'LoggingInterceptor',
      );
    }

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse<Response>();
          const { statusCode } = response;
          const responseTime = Date.now() - now;

          this.logger.log(
            `Outgoing Response: ${method} ${url} ${statusCode} - ${responseTime}ms`,
            'LoggingInterceptor',
          );
        },
        error: (error: Error) => {
          const responseTime = Date.now() - now;
          this.logger.error(
            `Request Error: ${method} ${url} - ${responseTime}ms - ${error.message}`,
            error.stack,
            'LoggingInterceptor',
          );
        },
      }),
    );
  }
}
