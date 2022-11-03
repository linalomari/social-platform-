import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthenticationGuard } from './guards/localAuth.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
// import { RolesGuard } from '../authorization/guards/roles.guard';
import { SignupDto } from './dto/signup.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const user = request.user;
    return this.authService.getJwtToken(user.id);
  }
  // @UseGuards(JwtAuthenticationGuard)
  // @Get()
  // authenticate(@Req() request: RequestWithUser) {
  //   const user = request.user;
  //   user.password = undefined;
  //   return user;
  // }
}
