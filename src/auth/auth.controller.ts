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

@Controller('auth') //global prefix route
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') //end point
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin') // end point
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
