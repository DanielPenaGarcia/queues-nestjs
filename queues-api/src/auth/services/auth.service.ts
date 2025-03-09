import { SignInDTO } from '@auth/inputs/sign-in.interface';
import { SignUpDTO } from '@auth/inputs/sign-up.interface';
import { Credentials } from '@auth/outputs/credentials.interface';
import { User } from '@entities/classes/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwt: JwtService
    ) { }

    async signUp(signUp: SignUpDTO): Promise<Credentials> {
        const user = this.userRepository.create(signUp);
        await this.userRepository.save(user);
        const payload = { id: user.id, name: `${user.names} ${user.lastNames}`, email: user.email };
        const accessToken = await this.jwt.signAsync(payload);
        return this.generateCredentials(accessToken, user);
    }

    async signIn(signIn: SignInDTO): Promise<Credentials> {
        const user = await this.userRepository.findOneBy({ email: signIn.email, password: signIn.password });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { id: user.id, name: `${user.names} ${user.lastNames}`, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt };
        const accessToken = await this.jwt.signAsync(payload);
        return this.generateCredentials(accessToken, user);
    }

    private generateCredentials(accessToken: string, user: User): Credentials {
        return {
            accessToken: accessToken,
            user: {
                id: user.id,
                names: user.names,
                lastNames: user.lastNames,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }
    }
}
