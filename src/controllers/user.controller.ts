import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { User as UserModel } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { CreateUserBody } from '../dtos/user/create-user';
import { UsersRepository } from '../repositories/users-repository';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
@UseGuards(AuthGuard('jwt'))
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
    userData.password = hashSync(userData.password, 10);
    return this.usersRepository.create(userData);
  }
}
