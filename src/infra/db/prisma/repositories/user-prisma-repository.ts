import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../../../data/repositories/user/user-repository';
import { IUser } from '../../../../domain/entities/user';
import { createUserOptions } from '../../../../domain/usecases/user/create-user';

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly connection: PrismaClient) {}

  createUser(user: createUserOptions): Promise<IUser> {
    return this.connection.user.create({
      data: user,
    });
  }

  findUserByEmail(email: string): Promise<IUser> {
    return this.connection.user.findUnique({
      where: { email },
    });
  }

  findUserByUsername(username: string): Promise<IUser> {
    return this.connection.user.findUnique({
      where: { username },
    });
  }

  findUserById(id: number): Promise<IUser> {
    return this.connection.user.findUnique({
      where: { id },
    });
  }
}
