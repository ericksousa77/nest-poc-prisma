import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';

import { User as UserModel } from '@prisma/client';
import { CreateUserBody } from '../dtos/create-user';
import { UsersRepository } from '../repositories/users-repository';

@Controller()
export class UserController {
  constructor(private usersRepository: UsersRepository) {}

  //   @Get('post/:id')
  //   async getPostById(@Param('id') id: string): Promise<PostModel> {
  //     return this.postService.post({ id: Number(id) });
  //   }

  @Get('users')
  async index(): Promise<UserModel[]> {
    return this.usersRepository.index();
  }

  @Post('users')
  async signupUser(@Body() userData: CreateUserBody): Promise<UserModel> {
    const { name, email } = userData;

    return this.usersRepository.create(name, email);
  }
}
