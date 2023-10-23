import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { StudentsService } from 'src/students/students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from 'src/students/students.entity';

@Module({
  imports: [JwtModule.register({ secret: 'secret key', signOptions: { expiresIn: '1h' } }),
  TypeOrmModule.forFeature([Students])],
  providers: [UserAuthService, StudentsService],
  controllers: [UserAuthController]
})
export class UserAuthModule { }
