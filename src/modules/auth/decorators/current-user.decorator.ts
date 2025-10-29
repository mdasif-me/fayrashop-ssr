import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IUserResponse } from '../../users/interface/user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IUserResponse | undefined => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: IUserResponse }>();
    return request.user;
  },
);
