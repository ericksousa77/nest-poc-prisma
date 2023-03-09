import { Prisma, User as UserModel } from '@prisma/client';
import { CreateUserBody } from 'src/dtos/user/create-user';

export interface UsersPaginated {
  page: number;
  pageSize: number;
  pageCount: number;
  users: UserModel[];
}
export abstract class UsersRepository {
  abstract create(userData: CreateUserBody): Promise<UserModel>;
  abstract index(params: {
    page?: number;
    pageSize?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserModel[] | UsersPaginated[] | any>;
  abstract findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel>;
}
