import { Body, Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
// import { AppService } from 'src/app.service';
// import { ConfigService } from '@nestjs/config';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/customize';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    // private configService: ConfigService, // ENV
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  @Public()
  @Post('create')
  createUser(@Body() users: CreateUserDto) {
    return this.usersService.create(users)
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('profile1')
  getProfile1(@Request() req) {
    return req.user;
  }
}
