<<<<<<< HEAD
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthDto } from './dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('signup')
    signup(@Body() dto: AuthDto) {
      return this.authService.signup(dto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
      return this.authService.signin(dto);
    }
  }
=======
import { Body, Controller, Post,} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth') //global prefix route
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto); //endpoint
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto); //authservice
    }
}
    
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284
