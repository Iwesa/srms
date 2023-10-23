import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from 'src/students/students.entity';
import { Admin } from './admin.entity';

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(Students) private readonly studentRepo: Repository<Students>,
        @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>) { }

    async getStudent(condition: any): Promise<Students> {
        return this.studentRepo.findOne({ where: { regNo: condition }, relations: ['units'] })
    }

    async createStudent(data: any): Promise<Students> {
        return this.studentRepo.save(data)
    }

    async createAdmin(data: any): Promise<Admin> {
        return this.adminRepo.save(data)
    }

    async findAdmin(condition: any): Promise<Admin> {
        return this.adminRepo.findOne({ where: { username: condition } })
    }
}