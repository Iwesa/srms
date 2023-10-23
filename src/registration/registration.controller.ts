import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express'

@Controller('registration')
export class RegistrationController {
    constructor(private readonly registrationService: RegistrationService, private jwtService: JwtService) { }

    @Post('register')
    async register(
        @Body('regNo') regNo: string,
        @Body('password') password: string
    ) {
        const student = await this.registrationService.getStudent(regNo)
        const hashedPass = await bcrypt.hash(password, 10)
        student.password = hashedPass
        const newStudent = await this.registrationService.createStudent(student)
        delete newStudent.password
        return newStudent
    }

    @Post('login')
    async login(
        @Body('regNo') regNo: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const student = await this.registrationService.getStudent(regNo)
        if (!student) {
            throw new UnauthorizedException('Invalid credentials')
        }
        if (! await bcrypt.compare(password, student.password)) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const jwt = await this.jwtService.signAsync({ regNo: student.regNo })
        response.cookie('jwt', jwt, { httpOnly: true })

        return {
            message: 'Success'
        }
    }

    @Get('student')
    async student(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt']
            const data = await this.jwtService.verifyAsync(cookie)
            const student = await this.registrationService.getStudent(data['regNo'])
            const { password, ...result } = student
            return result
        } catch (error) {
            throw new BadRequestException()
        }

    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt')
        return {
            message: 'Success'
        }
    }

    //     @Post('admin-auth')
    //     async adminLogin(
    //         @Body('username') username: string,
    //         @Body('password') password: string,
    //         @Res({ passthrough: true }) response: Response
    //     ) {
    //         const admin = await this.registrationService.findAdmin(username)
    //         if (!admin) {
    //             throw new BadRequestException('Invalid credentials')
    //         }

    //         if (password != admin.password) {
    //             throw new BadRequestException('Invalid credentials')
    //         }

    //         const jwt = await this.jwtService.signAsync({ id: admin.id })
    //         response.cookie('cookie', jwt, { httpOnly: true })

    //         return {
    //             message: 'Success'
    //         }
    //     }
}
