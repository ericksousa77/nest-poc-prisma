import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { Post as PostModel } from '@prisma/client';
import { CreatePostBody } from '../dtos/post/create-post';
import { PostsRepository } from '../repositories/posts-repository';

@Controller()
export class PostController {
  constructor(private postsRepository: PostsRepository) {}

  @Get('posts/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postsRepository.show(Number(id));
  }

  @Get('posts')
  async index(): Promise<PostModel[]> {
    return this.postsRepository.index();
  }

  @Post('posts')
  async signupUser(@Body() postData: CreatePostBody): Promise<PostModel> {
    return this.postsRepository.create(postData);
  }
}
