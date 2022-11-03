import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';

@Injectable()
export class UserGroupsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserGroupDto: CreateUserGroupDto) {
    return await this.prisma.userGroups.create({
      data: { ...createUserGroupDto },
    });
  }

  async findAllMembers(groupId: number) {
    return await this.prisma.group.findFirst({
      where: { id: groupId },
      include: {
        userGroups: { include: { user: { select: { username: true } } } },
      },
    });
  }

  async findMemberPosts(userId: number, groupId:number) {
    return await this.prisma.post.findMany({where:{userId,groupId}});
  }

  async update(id: number, updateUserGroupDto: UpdateUserGroupDto) {
    return await this.prisma.userGroups.update({where:{id},data:{...updateUserGroupDto}});
  }

  async remove(id: number) {
    return await this.update(id,{isDeleted:true})
  }
}
