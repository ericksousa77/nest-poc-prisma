import { Prisma, User as UserModel } from '@prisma/client';
import { CreateUserBody } from 'src/dtos/user/create-user';

export abstract class UsersRepository {
  abstract create(userData: CreateUserBody): Promise<UserModel>;
  abstract index(): Promise<UserModel[]>;
  abstract findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel>;
}
