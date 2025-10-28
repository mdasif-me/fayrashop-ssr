import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiProperty } from '@nestjs/swagger';
import { SKIP_RESPONSE_INTERCEPTOR_KEY } from '../decorators/skip-response-interceptor.decorator';

export interface PaginatedData<T> {
  data: T;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export class SuccessResponse<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

  @ApiProperty({ required: false })
  meta?: unknown;

  constructor(data: T, message: string = 'Success', meta?: unknown) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T> | T>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T> | T> {
    // Check if the handler has the SkipResponseInterceptor decorator
    const skipInterceptor = this.reflector.get<boolean>(
      SKIP_RESPONSE_INTERCEPTOR_KEY,
      context.getHandler(),
    );

    if (skipInterceptor) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return next.handle();
    }

    return next.handle().pipe(
      map((data: T | SuccessResponse<T> | PaginatedData<T>) => {
        if (this.isSuccessResponse(data)) {
          return data;
        }
        if (this.isPaginatedData(data)) {
          return new SuccessResponse(data.data, 'Success', data.meta);
        }
        return new SuccessResponse(data);
      }),
    );
  }

  /**
   * type guard to check if data is already a SuccessResponse
   */
  private isSuccessResponse(data: unknown): data is SuccessResponse<T> {
    return (
      typeof data === 'object' &&
      data !== null &&
      'success' in data &&
      (data as SuccessResponse<T>).success
    );
  }

  /**
   * type guard to check if data has pagination meta
   */
  private isPaginatedData(data: unknown): data is PaginatedData<T> {
    return (
      typeof data === 'object' &&
      data !== null &&
      'data' in data &&
      'meta' in data
    );
  }
}
