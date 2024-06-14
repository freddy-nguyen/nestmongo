import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/passport/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_ACCESS_TOKEN'),
          signOptions: {
            expiresIn: ms(config.get<string>('JWT_ACCESS_EXPIRE')),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],

})
export class AuthModule { }
