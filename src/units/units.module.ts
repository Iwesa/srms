import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Units } from './units.entity';
import { Students } from 'src/students/students.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Units, Students])],
  controllers: [UnitsController],
  providers: [UnitsService]
})
export class UnitsModule { }
