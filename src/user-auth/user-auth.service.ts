import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from 'src/students/students.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthService {
    constructor(@InjectRepository(Students) private studentRepo: Repository<Students>) { }

    async getStudent(regNo: string) {
        return this.studentRepo.findOne({
            where: {
                regNo: regNo
            }
        })
    }

    async getUnits(id: number) {
        return this.studentRepo.findOne({
            where: { id: id },
            relations: ['units']
        })
    }

    async update(student: Students) {
        return this.studentRepo.save(student)
    }
}
