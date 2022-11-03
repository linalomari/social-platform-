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
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { GroupsGuard } from 'src/authorization/guards/groups.guard';
import { PostsGuard } from 'src/authorization/guards/posts.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ReadPostsPolicyHandler } from 'src/authorization/policyHandlers/Posts/ReadPostsPolicyHandler';
import { CommentOnPostsPolicyHandler } from 'src/authorization/policyHandlers/Posts/CommentPostsPolicyHandler';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { DeletePostsPolicyHandler } from 'src/authorization/policyHandlers/Posts/DeletePostsPolicyHandler';

@Controller('groups/:groupId/posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthenticationGuard, PostsGuard)
  @Roles(new CommentOnPostsPolicyHandler())
  @Post()
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: RequestWithUser,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    createCommentDto.authorId = req.user.id;
    createCommentDto.postId = postId;
    return this.commentsService.create(createCommentDto);
  }

  @UseGuards(JwtAuthenticationGuard, GroupsGuard)
  @Roles(new ReadPostsPolicyHandler())
  @Get()
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findAll(postId);
  }

  @UseGuards(JwtAuthenticationGuard, GroupsGuard)
  @Roles(new ReadPostsPolicyHandler())
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @UseGuards(JwtAuthenticationGuard, PostsGuard)
  @Roles(new DeletePostsPolicyHandler())
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(+id);
  }
}
