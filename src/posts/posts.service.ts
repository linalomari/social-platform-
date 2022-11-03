import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(groupId: number, createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: { groupId, ...createPostDto },
    });
  }

  async findAll(groupId:number) {
    console.log(groupId)
    return await this.prisma.post.findMany({where:{groupId} , select:{userId:true,text:true, comments:{select:{text:true, authorId:true}} }});
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: { ...updatePostDto },
    });
  }

  async remove(id: number) {
    return await this.update(id,{isDeleted:true});
  }
}
