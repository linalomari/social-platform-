import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService){}
  async create(createCommentDto: CreateCommentDto) {
    return await this.prisma.comment.create({data:{...createCommentDto}})
  }

  async findAll(postId: number) {
    return await this.prisma.comment.findMany({where:{postId}});
  }

  async findOne(id: number) {
    return this.prisma.comment.findFirst({where:{id}});
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.prisma.comment.update({where:{id},data:{...updateCommentDto}});
  }

  async remove(id: number) {
    return await this.update(id,{isDeleted:true});
  }
}
