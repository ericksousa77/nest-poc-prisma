import { User as UserModel } from '@prisma/client';

export abstract class UsersRepository {
  abstract create(name: string, email: string): Promise<UserModel>;
  abstract index(): Promise<UserModel[]>;
}
