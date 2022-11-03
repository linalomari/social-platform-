import { IsString, Max, Min } from "class-validator";

export class SignupDto{
    @IsString()
    @Max(15)
    username: string
    @IsString()
    @Min(8)
    password:string

}