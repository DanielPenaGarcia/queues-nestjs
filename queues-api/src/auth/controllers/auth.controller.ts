import { SignInDTO } from '@auth/inputs/sign-in.interface';
import { SignUpDTO } from '@auth/inputs/sign-up.interface';
import { AuthService } from '@auth/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private readonly auth: AuthService){}

    @Post('sign-up')
    async signUp(@Body() signUp: SignUpDTO) {
        return this.auth.signUp(signUp);
    }

    @Post('sign-in')    
    async signIn(@Body() signIn: SignInDTO) {
        return this.auth.signIn(signIn);
    }
}
