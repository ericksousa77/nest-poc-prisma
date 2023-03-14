import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { PostsModule } from './post.module';
import { UsersModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from 'src/helpers/auth';
import { APP_GUARD } from '@nestjs/core';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
