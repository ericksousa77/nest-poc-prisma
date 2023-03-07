import { ConflictException, Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(name: string, email: string): Promise<UserModel> {
    console.log('aquiiiiiiiiiiiiiii1');
    return this.prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
      },
    });
  }

  async index(): Promise<UserModel[]> {
    return this.prisma.user.findMany({
      // where: { email: { equals: 'erick.sousa3@nav9.tech' } },
    });
  }
}
