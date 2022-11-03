import { IsOptional, IsString } from "class-validator";

export class CreateGroupDto {
    // @IsOptional()
    id:number
    @IsString()
    name: string
    @IsOptional()
    @IsString()
    description?: string
    @IsOptional()
    isDeleted?: boolean

}
