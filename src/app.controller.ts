import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService, // ENV
  ) { }
  @Get()
  @Render('home')
  handleHomePage() {
    console.log(this.configService.get<string>('PORT')) //ENV CHECK
    const message = this.appService.getHello();
    return { message: message }
  }
  // getHello() {
  // return "this.appService.getHello();"
  // }
}
