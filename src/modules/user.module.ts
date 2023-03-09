import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { UsersRepository } from 'src/repositories/users-repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
