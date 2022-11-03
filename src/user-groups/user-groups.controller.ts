import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserGroupsService } from './user-groups.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import { GroupsGuard } from 'src/authorization/guards/groups.guard';
import { AddMemberPolicyHandler } from 'src/authorization/policyHandlers/Groups/AddMemberPolicyHandler';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { ReadPostsGroupPolicyHandler } from 'src/authorization/policyHandlers/Groups/ReadPostsGroupPolicyHandler';

@Controller('groups/:groupId/members')
export class UserGroupsController {
  constructor(private readonly userGroupsService: UserGroupsService) {}

  @UseGuards(JwtAuthenticationGuard, GroupsGuard)
  @Roles(new AddMemberPolicyHandler())
  @Post()
  create(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() createUserGroupDto: CreateUserGroupDto,
  ) {
    createUserGroupDto.groupId = groupId;
    return this.userGroupsService.create(createUserGroupDto);
  }

  @UseGuards(JwtAuthenticationGuard, GroupsGuard)
  @Roles(new ReadPostsGroupPolicyHandler())
  @Get()
  findAllMembers(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.userGroupsService.findAllMembers(+groupId);
  }

  @UseGuards(JwtAuthenticationGuard, GroupsGuard)
  @Roles(new ReadPostsGroupPolicyHandler())
  @Get(':id')
  findMemberPosts(
    @Param('id') userId: number,
    @Param('groupId') groupId: number,
  ) {
    return this.userGroupsService.findMemberPosts(userId, groupId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserGroupDto: UpdateUserGroupDto,
  ) {
    return this.userGroupsService.update(+id, updateUserGroupDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGroupsService.remove(+id);
  }
}
