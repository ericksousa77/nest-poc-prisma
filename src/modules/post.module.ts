import { Module } from '@nestjs/common';
import { PostController } from 'src/controllers/post.controller';

import { PrismaService } from 'src/services/database/prisma.service';
import { PostsRepository } from 'src/repositories/posts-repository';
import { PrismaPostsRepository } from 'src/repositories/prisma/prisma-posts-repository';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    PrismaService,
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
  ],
  exports: [PostsRepository],
})
export class PostsModule {}
