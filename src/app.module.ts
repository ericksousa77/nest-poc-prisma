import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostController } from './controllers/post.controller';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './database/prisma.service';
import { PostsRepository } from './repositories/posts-repository';
import { PrismaPostsRepository } from './repositories/prisma/prisma-posts-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';
import { UsersRepository } from './repositories/users-repository';
import { PostService } from './services/post/post.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, PostController],
  providers: [
    PrismaService,
    UserService,
    PostService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
  ],
})
export class AppModule {}
