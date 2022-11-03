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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import { defineAbility } from '@casl/ability';
import { UserService } from 'src/users/user.service';
import {
  AbilityFactory,
  PostActions,
} from 'src/authorization/casl/ability.factory';
import { UnauthorizedException } from '@nestjs/common/exceptions';
// import { MemberReadPolicyHandler } from 'src/authorization/policyHandlers/MemberReadPolicyHandler';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { GroupsGuard } from 'src/authorization/guards/groups.guard';
import { PostsGuard } from 'src/authorization/guards/posts.guard';
import { Role } from '@prisma/client';
import { DeletePostsPolicyHandler } from 'src/authorization/policyHandlers/Posts/DeletePostsPolicyHandler';
import { EditPostsPolicyHandler } from 'src/authorization/policyHandlers/Posts/EditPostsPolicyHandler';
import { ReadPostsPolicyHandler } from 'src/authorization/policyHandlers/Posts/ReadPostsPolicyHandler';
import { PostInGroupPolicyHandler } from 'src/authorization/policyHandlers/Groups/PostInGroupPolicyHandler';
import { ReadPostsGroupPolicyHandler } from 'src/authorization/policyHandlers/Groups/ReadPostsGroupPolicyHandler';
import { request } from 'http';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';

@Controller('groups/:groupId/posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UserService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard, GroupsGuard)
  @Roles(new PostInGroupPolicyHandler())
  async create(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestWithUser,
  ) {
    createPostDto.userId = req.user.id;
    return this.postsService.create(groupId, createPostDto);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard, GroupsGuard)
  @Roles(new ReadPostsGroupPolicyHandler())
  findAll(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: RequestWithUser,
  ) {
    console.log(req.user.id)
    return this.postsService.findAll(groupId);
  }

  @Get(':postId')
  @UseGuards(JwtAuthenticationGuard, PostsGuard)
  @Roles(new ReadPostsPolicyHandler())
  findOne(@Param('postId') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':postId')
  @UseGuards(JwtAuthenticationGuard, PostsGuard)
  @Roles(new EditPostsPolicyHandler())
  update(@Param('postId') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthenticationGuard, PostsGuard)
  @Roles(new DeletePostsPolicyHandler())
  remove(@Param('postId') id: string) {
    return this.postsService.remove(+id);
  }
}
