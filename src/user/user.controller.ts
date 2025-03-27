import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { User } from '@prisma/client';
<<<<<<< HEAD
import { UserService } from '../user/user.service';
import { EditUserDto } from '../user/dto';
=======
import { UserService } from './user.services';
import { EditUserDto } from './dto';
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
     @Get('me')
    getMe(@GetUser() user: User) {
          return user;
    }
 @Patch()
 editUser(
    @GetUser('id') userId: number,
    @Body () dto: EditUserDto,
 ) {
    return this.userService.editUser(userId, dto);
 }
 
<<<<<<< HEAD
}
=======
}
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284
