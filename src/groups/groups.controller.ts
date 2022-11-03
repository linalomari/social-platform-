import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {CreateUserGroupDto} from 'src/user-groups/dto/create-user-group.dto'
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import { UserGroupsService } from 'src/user-groups/user-groups.service';
import { Role } from '@prisma/client';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { GroupsGuard } from 'src/authorization/guards/groups.guard';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { AddMemberPolicyHandler } from 'src/authorization/policyHandlers/Groups/AddMemberPolicyHandler';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly userGroupsService: UserGroupsService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.groupsService.create(req, userId, createGroupDto);
  }

  // @UseGuards(JwtAuthenticationGuard, GroupsGuard)
  // @Roles(new AddMemberPolicyHandler())
  // @Post(':groupId/addMember')
  // async addMember(
  //   @Param('groupId', ParseIntPipe) groupId: number,
  //   @Body() createUserGroupDto: CreateUserGroupDto,
  //   @Req() req: RequestWithUser,
  // ) {
  //   createUserGroupDto.groupId = groupId;
  //   console.log(req.user.id);
  //   return await this.userGroupsService.create(createUserGroupDto);
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupsService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
