import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserGroupsModule } from 'src/user-groups/user-groups.module';
import { UserGroupsService } from 'src/user-groups/user-groups.service';
import { AbilityFactory } from 'src/authorization/casl/ability.factory';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService,PrismaService,UserGroupsService,AbilityFactory],
  imports:[PrismaModule,UserGroupsModule],
})
export class GroupsModule {}
