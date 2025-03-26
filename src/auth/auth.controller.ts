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
    