import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('user-auth')
export class UserAuthController {
    constructor(private userAuthService: UserAuthService, private jwtService: JwtService) { }

    @Post('register')
    async register(
        @Body('regNo') regNo: string,
        @Body('password') password: string,
    ) {
        const student = await this.userAuthService.getStudent(regNo);
        const pwd = await bcrypt.hash(password, 10);
        student.password = pwd;
        this.userAuthService.update(student);
    }

    @Post('login')
    async login(
        @Body('regNo') regNo: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const student = await this.userAuthService.getStudent(regNo)
        if (!student) {
            throw new UnauthorizedException('Invalid credentials')
        }
        if (!await bcrypt.compare(password, student.password)) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const jwt = await this.jwtService.signAsync({ 'id': student.id })
        response.cookie('jwt', jwt, { httpOnly: true })
        return {
            message: 'Success'
        }
    }

    @Get('student')
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt']
        try {
            const data = await this.jwtService.verifyAsync(cookie)
            const student = await this.userAuthService.getUnits(data['id'])
            const { password, ...result } = student
            return result
        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt')
        return {
            message: 'Success'
        }
    }
}
