import { Injectable } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { PrismaService } from 'src/services/database/prisma.service';
import { PostsRepository } from '../posts-repository';
import { CreatePostBody } from 'src/dtos/post/create-post';

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}
  async create(postData: CreatePostBody): Promise<PostModel> {
    const { title, content, authorId, published = false } = postData;
    return this.prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published,
      },
    });
  }

  async index(): Promise<PostModel[]> {
    return this.prisma.post.findMany({
      // where: { email: { equals: 'erick.sousa3@nav9.tech' } },
    });
  }

  async show(id: number): Promise<PostModel> {
    return this.prisma.post.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
