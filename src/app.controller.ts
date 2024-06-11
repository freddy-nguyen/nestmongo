import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService, // ENV
    private authService: AuthService,
  ) { }

  @UseGuards(LocalAuthGuard)
  // @Public()
  @Post('/login')
  async login(@Request() req) {
    console.log('>>>check aoo cntroller', req.user.email, req.user._id)
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('profile1')
  getProfile1(@Request() req) {
    return req.user;
  }
}
