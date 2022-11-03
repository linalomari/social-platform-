import { Module } from '@nestjs/common';
import { UserGroupsService } from './user-groups.service';
import { UserGroupsController } from './user-groups.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AbilityFactory } from 'src/authorization/casl/ability.factory';

@Module({
  controllers: [UserGroupsController],
  providers: [UserGroupsService,PrismaService,AbilityFactory],
  imports:[PrismaModule]
})
export class UserGroupsModule {}
