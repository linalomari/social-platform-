import { subject } from '@casl/ability';
import { Group, Post } from '@prisma/client';
import {
  AppAbility,
  GroupActions,
  PostActions,
} from 'src/authorization/casl/ability.factory';
import { IPolicyHandler } from 'src/authorization/policyHandlers/interfaces/IPolicyHandler';

export class PostInGroupPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, group:Group): boolean {
    return ability.can(GroupActions.Post, group);
  }
}
