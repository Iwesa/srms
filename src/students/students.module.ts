import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './students.entity';
import { Units } from 'src/units/units.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Units])],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
