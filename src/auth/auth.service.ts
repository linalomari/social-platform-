import { Body, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { SignupDto } from './dto/signup.dto';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signup(signupDto: SignupDto) {
    const password = await bcrypt.hash(signupDto.password, 12);
    console.log(password);
    return await this.prisma.user.create({
      data: { ...signupDto, password },
    });
  }

  async login(@Body() loginDto: LoginDto) {
    try {
      if (
        bcrypt.compareSync(
          loginDto.password,
          (
            await this.prisma.user.findUniqueOrThrow({
              where: { username: loginDto.username },
            })
          ).password,
        )
      ) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: { username: loginDto.username },
        });
        return user;
      } else {
        throw new BadRequestException('Wrong username or password'); 
      }
    } catch (error) {
      console.log(error);
      throw error ('User does not exist');
    }
  }

  public getJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwt.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return token;
  }
}
