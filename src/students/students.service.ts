import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from './students.entity';
import { Student } from './students.model'
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Students) private studentRepository: Repository<Students>,
    ) { }

    async create(student: Student): Promise<any> {
        return await this.studentRepository.save(student)
    }

    async findAll(): Promise<Students[]> {
        return this.studentRepository.find({ relations: ['units'] })
    }

    async findOne(id: number): Promise<Students> {
        return this.studentRepository.findOne({
            where: {
                id: id
            }
        }
        )
    }

    async deleteStudent(id: number): Promise<any> {
        return this.studentRepository.delete(id)
    }

    async update(student: Student): Promise<any> {
        return this.studentRepository.save(student)
    }
}
