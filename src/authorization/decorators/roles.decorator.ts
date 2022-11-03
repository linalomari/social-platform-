import { SetMetadata } from '@nestjs/common';
import { GroupActions, PostActions } from '../casl/ability.factory';
import { IPolicyHandler } from '../policyHandlers/interfaces/IPolicyHandler';
export const USER_POLICIES_KEY = 'USER_POLICIES_KEY';

export const Roles = (...handler: IPolicyHandler[]) =>
  SetMetadata(USER_POLICIES_KEY, handler);
