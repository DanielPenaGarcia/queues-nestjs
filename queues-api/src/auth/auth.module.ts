import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfiguration } from '@configurations/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/classes/user.entity';
import { EntitiesModule } from '@entities/entities.module';

@Module({
  imports: [JwtModule.register(JwtConfiguration), EntitiesModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
