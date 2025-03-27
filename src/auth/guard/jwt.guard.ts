<<<<<<< HEAD
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
=======
import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt'){
    constructor() {
        super();
    }
}
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284
