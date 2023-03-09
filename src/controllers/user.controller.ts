import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { User as UserModel } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { CreateUserBody } from '../dtos/user/create-user';
import { UsersRepository } from '../repositories/users-repository';

import { Public } from 'src/helpers/auth';

@Controller('users')
export class UserController {
  constructor(private usersRepository: UsersRepository) {}

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<UserModel> {
    return this.usersRepository.findOne({ id: String(id) });
  }

  @Get()
  async index(@Query() queryParams): Promise<UserModel[]> {
    const { page, pageSize, where, orderBy } = queryParams;
    return this.usersRepository.index({
      page: Number(page),
      pageSize: Number(pageSize),
      where,
      orderBy: { name: 'asc' },
    });
  }

  @Public()
  @Post()
  async signupUser(@Body() userData: CreateUserBody): Promise<UserModel> {
    userData.password = hashSync(userData.password, 10);
    return this.usersRepository.create(userData);
  }
}
