import { Role } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateUserGroupDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  groupId: number;
  @IsOptional()
  role?: Role;
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
