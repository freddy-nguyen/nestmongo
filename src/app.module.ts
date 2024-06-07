import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ //ENV
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot('mongodb+srv://qacer6973:Qetuo3.3.3.@cluster0.votkycs.mongodb.net/')
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }