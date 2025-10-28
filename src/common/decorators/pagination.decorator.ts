import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

export class PaginationParams {
  page: number = 1;
  limit: number = 10;
  sortBy?: string;
  sortOrder: 'ASC' | 'DESC' = 'DESC';
  search?: string;
}

interface QueryParams {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

/**
 * pagination decorator - extracts pagination params from query string and returns an instance of PaginationParams
 * @returns {PaginationParams}
 */
export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const query = request.query as QueryParams;

    const pagination = new PaginationParams();
    pagination.page = query.page ? parseInt(query.page, 10) || 1 : 1;
    pagination.limit = query.limit ? parseInt(query.limit, 10) || 10 : 10;
    pagination.sortBy = query.sortBy;
    pagination.sortOrder = query.sortOrder === 'ASC' ? 'ASC' : 'DESC';
    pagination.search = query.search;

    return pagination;
  },
);

/**
 * swagger decorator for pagination query parameters
 * applies ApiQuery for page, limit, sortBy, sortOrder, and search to the decorated route handler
 */
export const ApiPaginationQuery = () => {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiQuery({ name: 'page', required: false, type: Number })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ name: 'limit', required: false, type: Number })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ name: 'sortBy', required: false, type: String })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ name: 'search', required: false, type: String })(
      target,
      propertyKey,
      descriptor,
    );
  };
};
