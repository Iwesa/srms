import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Students } from './students.entity';
import { Student } from './students.model';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post()
  async create(@Body() student: Student): Promise<any> {
    return this.studentsService.create(student)
  }

  @Get()
  async findAll(): Promise<Students[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() param): Promise<Student> {
    return this.studentsService.findOne(param.id)
  }

  @Delete(':id/delete')
  async deleteStudent(@Param('id') id: number): Promise<any> {
    return this.studentsService.deleteStudent(id)
  }

  @Post(':id/update')
  async update(@Param('id') id: number, @Body() student: Student): Promise<any> {
    student.id = Number(id)
    return this.studentsService.update(student)
  }
}
