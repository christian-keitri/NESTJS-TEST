<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [UserController],
  providers:[UserService],
})
export class UserModule {}
=======
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.services';

@Module({
  controllers: [UserController],
  providers:[UserService],
})
export class UserModule {}
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284
