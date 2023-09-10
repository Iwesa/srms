import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Students } from './students.entity';
import { Student } from './students.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express'
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private jwtService: JwtService) { }

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

  // Method for registering a student
  @Post('register')
  async register(
    @Body('regNo') regNo: string,
    @Body('password') password: string
  ) {
    const student = await this.studentsService.getStudent(regNo)
    const hashedPass = await bcrypt.hash(password, 10)
    student.password = hashedPass
    return await this.studentsService.register(student)
    // student.id = id
    // const hashedPass = await bcrypt.hash(student.password, 10)
    // student.password = hashedPass
    // return await this.studentsService.register(student)
  }

  // Method for logging in a student
  @Post('login')
  async login(
    @Body('regNo') regNo: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response) {
    const student = await this.studentsService.getStudent(regNo)

    if (!student) {
      throw new BadRequestException('Invalid credentials')
    }

    if (!await bcrypt.compare(password, student.password)) {
      throw new BadRequestException('Invalid credentials')
    }

    const jwt = await this.jwtService.signAsync({ id: student.id })

    response.cookie('jwt', jwt, { httpOnly: true })
    return {
      message: 'Success'
    }
  }

  @Get('student-details')
  async student(@Req() request: Request) {
    const cookie = request.cookies(['jwt'])
    return cookie
    // try {
    //   const cookie = request.cookies['jwt']
    //   // const data = await this.jwtService.verifyAsync(cookie)

    //   // const student = await this.studentsService.getStudent(data['regNo'])

    //   // const { password, ...result } = student
    //   return cookie
    // } catch (e) {
    //   throw new UnauthorizedException()
    // }

  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return {
      message: 'Success'
    }
  }
}
