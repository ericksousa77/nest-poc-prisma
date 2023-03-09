import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/services/database/prisma.service';
import { UsersPaginated, UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';
import { CreateUserBody } from 'src/dtos/user/create-user';
import { getPagination } from 'src/helpers/pagination';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(userData: CreateUserBody): Promise<UserModel> {
    const { name, email, password } = userData;
    try {
      return await this.prisma.user.create({
        data: {
          id: randomUUID(),
          name,
          email,
          password,
        },
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new BadRequestException('Email already in use');
      }

      throw new BadRequestException(error.message);
    }
  }

  async index(params: {
    page?: number;
    pageSize?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UsersPaginated[] | any> {
    const { where, orderBy } = params;

    const { page, pageSize, calculatePageCount } = getPagination(params);

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        include: { posts: true },
        skip: page * pageSize,
        take: pageSize,
        where,
        orderBy,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      page: page + 1,
      pageSize,
      pageCount: calculatePageCount(total),
    };
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) throw new NotFoundException();

    return user;
  }
}
