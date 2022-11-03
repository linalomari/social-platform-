import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserModule } from 'src/users/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbilityModule } from 'src/authorization/casl/ability.module';
import { UserService } from 'src/users/user.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, UserService],
  imports: [PrismaModule, UserModule, AbilityModule],
})
export class PostsModule {}
