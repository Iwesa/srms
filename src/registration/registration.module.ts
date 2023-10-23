import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Students } from 'src/students/students.entity';
import { Admin } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Admin]),
  JwtModule.register({
    secret: 'secret-code',
    signOptions: { expiresIn: '1d' }
  })],
  providers: [RegistrationService],
  controllers: [RegistrationController]
})
export class RegistrationModule { }
