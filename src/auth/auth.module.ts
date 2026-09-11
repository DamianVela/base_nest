import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Persona } from '../entities/personal.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Sesion } from '../entities/sesion.entity';
import { TokenRevocado } from '../entities/token-revocado.entity';
import { LoginAttempt } from '../entities/login-attempt.entity';
import {
  apiLoginLimiter,
  limiterRefresh,
} from '../common/middlewares/rate-limiters';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persona, Sesion, TokenRevocado, LoginAttempt]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, RolesGuard],
  exports: [JwtModule, JwtAuthGuard, RolesGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(apiLoginLimiter).forRoutes({
      path: 'auth/login',
      method: RequestMethod.POST,
    });
    consumer.apply(limiterRefresh).forRoutes({
      path: 'auth/refresh',
      method: RequestMethod.POST,
    });
  }
}
