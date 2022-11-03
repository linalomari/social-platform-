import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AbilityFactory } from 'src/authorization/casl/ability.factory';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService,PrismaService,AbilityFactory],
  imports:[PrismaModule]
})
export class CommentsModule {}
