import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/services/database/prisma.service';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';
import { CreateUserBody } from 'src/dtos/user/create-user';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(userData: CreateUserBody): Promise<UserModel> {
    const { name, email, password } = userData;
    return this.prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        password,
      },
    });
  }

  async index(): Promise<UserModel[]> {
    return this.prisma.user.findMany({
      include: { posts: true },
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
