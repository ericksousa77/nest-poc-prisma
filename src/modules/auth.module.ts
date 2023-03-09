import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { LocalStrategy } from '../services/auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from 'src/controllers/ auth.controller';
import { JwtStrategy } from '../services/auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
