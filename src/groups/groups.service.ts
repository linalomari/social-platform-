import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserGroupDto } from 'src/user-groups/dto/create-user-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    req: RequestWithUser,
    userId: number,
    createGroupDto: CreateGroupDto,
  ) {
    return await this.prisma.group.create({
      data: {
        ...createGroupDto,
        userGroups: {
          create: {
            userId,
            role: Role.ADMIN,
          },
        },
      },
     });
    
  }

  async findAll() {
    return await this.prisma.group.findMany({
      select: { name: true, description: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.group.findFirst({
      where: { id },
      select: { name: true, description: true },
    });
  }

  async addMember(groupId: number, userId: number, role: Role) {
    return await this.prisma.userGroups.create({
      data: { groupId, userId, role },
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return await this.prisma.group.update({
      where: { id },
      data: { ...updateGroupDto },
    });
  }

  async remove(id: number) {
    return await this.update(id, { isDeleted: true });
  }
}
