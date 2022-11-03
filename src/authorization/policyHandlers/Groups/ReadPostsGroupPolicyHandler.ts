import { subject } from '@casl/ability';
import { Group, Post } from '@prisma/client';
import {
  AppAbility,
  GroupActions,
} from 'src/authorization/casl/ability.factory';
import { IPolicyHandler } from 'src/authorization/policyHandlers/interfaces/IPolicyHandler';

export class ReadPostsGroupPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, group: Group): boolean {
    return ability.can(GroupActions.GetPosts, subject('Group', group));
  }
}
