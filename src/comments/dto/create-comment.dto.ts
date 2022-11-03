import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateCommentDto {
    @IsNumber()
    authorId:number
    @IsString()
    text:string
    @IsNumber()
    postId:number
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean

}
