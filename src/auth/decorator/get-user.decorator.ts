import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest() as Request & { user?: { [key: string]: any } }; // Type assertion added
    if (data) {
      return request.user?.[data]; // Optional chaining ensures safety
    }
    return request.user;
  },
);
