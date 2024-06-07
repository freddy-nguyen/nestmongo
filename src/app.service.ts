import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is called SSR - Server Side Rendering (server would render HTML data). React is Client Side Rendering (client would render HTML data';
  }
}
