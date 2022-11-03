import { subject } from '@casl/ability';
import { Post } from '@prisma/client';
import {
  AppAbility,
  PostActions,
} from 'src/authorization/casl/ability.factory';
import { IPolicyHandler } from 'src/authorization/policyHandlers/interfaces/IPolicyHandler';

export class ReadPostsPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, post:Post): boolean {
    return ability.can(PostActions.Read, post);
  }
}
