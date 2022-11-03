import { AppAbility } from 'src/authorization/casl/ability.factory';
import { User } from '@prisma/client';

export interface IPolicyHandler {
  handle(ability: AppAbility, object: any): boolean | Promise<boolean>;
}
