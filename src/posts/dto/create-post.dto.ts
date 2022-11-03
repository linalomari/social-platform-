import { IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    text: string
    @IsOptional()
    isDeleted?: boolean
    userId:number
    

    
}
