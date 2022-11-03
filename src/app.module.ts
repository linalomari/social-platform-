import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { UserGroupsModule } from './user-groups/user-groups.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, PostsModule, GroupsModule,ConfigModule, CommentsModule, UserGroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
