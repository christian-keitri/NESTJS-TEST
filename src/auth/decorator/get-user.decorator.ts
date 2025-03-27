import {
<<<<<<< HEAD
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
=======
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data:unknown, ctx: ExecutionContext) => {
        const request: Express.Request = ctx
        .switchToHttp()
        .getRequest();
        return request.user;
    },

);
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284
