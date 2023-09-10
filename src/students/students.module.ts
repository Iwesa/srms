import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './students.entity';
import { Units } from 'src/units/units.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Units]),
  JwtModule.register({
    secret: 'secret-code',
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule { }
