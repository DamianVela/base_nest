import { Module } from '@nestjs/common';
import { LoginAttemptsService } from './login-attempts.service';
import { LoginAttemptsController } from './login-attempts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginAttempt } from '../../../entities/login-attempt.entity';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  controllers: [LoginAttemptsController],
  providers: [LoginAttemptsService],
  imports: [TypeOrmModule.forFeature([LoginAttempt]), AuthModule],
})
export class LoginAttemptsModule {}
