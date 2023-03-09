import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UsersModule } from './user.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
