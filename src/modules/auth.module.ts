import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { LocalStrategy } from '../services/auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { AuthController } from 'src/controllers/ auth.controller';
import { JwtStrategy } from '../services/auth/strategies/jwt.strategy';
import { MailModule } from './mail.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: config.get<string>('EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    MailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
