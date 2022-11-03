import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbilityFactory } from 'src/authorization/casl/ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: { ...createUserDto } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async findAllGroups(userId: number) {
    return await this.prisma.userGroups.findMany({
      where: { userId },
      include: { group: { select: { name: true, description: true } } },
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }
  async getById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
