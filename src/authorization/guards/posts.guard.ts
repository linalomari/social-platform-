import { defineAbility } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ParamData,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AbilityFactory } from 'src/authorization/casl/ability.factory';
import { IPolicyHandler } from 'src/authorization/policyHandlers/interfaces/IPolicyHandler';
import { USER_POLICIES_KEY } from 'src/authorization/decorators/roles.decorator';
import { Request } from 'express';
import { Role, User } from '@prisma/client';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: RequestWithUser = context.switchToHttp().getRequest();
    const user: User = req.user;
    const postId = parseInt(req.params.postId);
    const groupId = parseInt(req.params.groupId);
    const post = await this.getPostById(postId);
    const role = await this.getUserRole(user, groupId);
    let abilities;
    switch (role) {
      case Role.ADMIN:
        abilities = this.abilityFactory.defineAdminPostAbility(user,post);
        break;
      case Role.MEMBER:
        abilities = this.abilityFactory.defineMemberPostAbility(user, post);
        break;
      default:
        abilities = this.abilityFactory.defineUserPostAbility(user, post);
    }
    const rolePolicyHandlers =
      this.reflector.get<IPolicyHandler[]>(
        USER_POLICIES_KEY,
        context.getHandler(),
      ) || [];
    let permission = true;
    for (const handler of rolePolicyHandlers) {
      permission &&= await handler.handle(abilities, post);
    }

    return permission;
  }

  async getUserRole(user: User, groupId: number) {
    try {
      const userId = user.id;
      const role = await this.prisma.userGroups.findFirst({
        where: { userId, groupId },
        select: { role: true },
      });
      return role.role;
    } catch (error) {
      return Role.USER;
    }
  }
  async getPostById(id: number) {
    return await this.prisma.post.findFirst({ where: { id } });
  }
//   async isAdmin(user: User, groupId: number) {
//     const role = await this.getUserRole(user, groupId);
//     if (role == Role.ADMIN) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   async isMember(user: User, groupId: number) {
//     const role = await this.getUserRole(user, groupId);
//     if (role == Role.MEMBER) {
//       return true;
//     } else {
//       return false;
//     }
//   }
}
