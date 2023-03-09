import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { PostsModule } from './post.module';
import { UsersModule } from './user.module';
import { JwtAuthGuard } from 'src/helpers/auth';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule, AuthModule, PostsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
