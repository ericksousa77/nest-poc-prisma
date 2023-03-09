import { Controller, Get, Post, Body, Request } from '@nestjs/common';

import { User as UserModel } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { CreateUserBody } from '../dtos/user/create-user';
import { UsersRepository } from '../repositories/users-repository';

import { Public } from 'src/helpers/auth';

@Controller('users')
export class UserController {
  constructor(private usersRepository: UsersRepository) {}

  //   @Get(':id')
  //   async getPostById(@Param('id') id: string): Promise<PostModel> {
  //     return this.postService.post({ id: Number(id) });
  //   }

  @Get()
  async index(@Request() req): Promise<UserModel[]> {
    console.log({ user: req.user });
    return this.usersRepository.index();
  }

  @Public()
  @Post()
  async signupUser(@Body() userData: CreateUserBody): Promise<UserModel> {
    userData.password = hashSync(userData.password, 10);
    return this.usersRepository.create(userData);
  }
}
