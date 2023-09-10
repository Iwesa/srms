import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { UnitsModule } from './units/units.module';
import { Students } from './students/students.entity';
import { Units } from './units/units.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'wdbase',
      database: 'school',
      entities: [Students, Units],
      synchronize: true
    }),
    StudentsModule,
    UnitsModule,
  ],
})
export class AppModule { }
