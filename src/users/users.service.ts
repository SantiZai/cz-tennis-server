import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        orders: true,
      },
    });
    if (user) return user;
    else throw new NotFoundException(`User with id ${id} not found`);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        orders: true,
      },
    });
    if (user) return user;
    else throw new NotFoundException(`User with email ${email} not found`);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async updateUser(user: Partial<User>): Promise<User | null> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!existingUser)
      throw new NotFoundException(`User with id ${user.id} not found`);
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }

  async deleteUser(id: string): Promise<User | null> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
