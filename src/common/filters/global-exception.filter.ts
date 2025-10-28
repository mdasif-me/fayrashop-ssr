import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../../logger/logger.service';

interface IErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  errors?: unknown;
}

interface IHttpExceptionResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
  errors?: unknown;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse: IErrorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      errorResponse.statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        errorResponse.message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse) {
        const responseObj = exceptionResponse as IHttpExceptionResponse;
        errorResponse.message = Array.isArray(responseObj.message)
          ? responseObj.message.join(', ')
          : responseObj.message || exception.message;
        errorResponse.errors = responseObj.errors;
      }
    } else if (exception instanceof Error) {
      errorResponse.message = exception.message;
    }

    /**
     * log the exception details
     * including method, URL, status code, and stack trace for easier debugging and monitoring
     */
    this.logger.error(
      `${request.method} ${request.url} ${errorResponse.statusCode}`,
      exception instanceof Error ? exception.stack : undefined,
      'ExceptionFilter',
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
