import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Units } from './units.entity';
import { Repository } from 'typeorm';
import { Unit } from './units.model';
import { Students } from 'src/students/students.entity';

@Injectable()
export class UnitsService {
    constructor(
        @InjectRepository(Units) private unitRepository: Repository<Units>,
        @InjectRepository(Students) private studentRepository: Repository<Students>,) { }

    async create(unit: Unit): Promise<any> {
        return await this.unitRepository.save(unit)
    }

    async findAll(): Promise<Units[]> {
        return this.unitRepository.find()
    }

    async findOne(code: string): Promise<Unit> {
        return this.unitRepository.findOne({
            where: {
                code: code
            }
        })
    }

    async createUnits(id: number, unit: Unit): Promise<any> {
        const student = await this.studentRepository.findOneBy({ id })
        if (!student) {
            throw new HttpException('Student not found!', HttpStatus.BAD_REQUEST)
        }

        const newUnit = this.unitRepository.create({ ...unit, student })
        return await this.unitRepository.save(newUnit)

    }

    async getUnits(id: number): Promise<any> {
        return this.studentRepository.findOne({
            where: { id: id },
            relations: ['units']
        })
    }

    async update(unit: Unit): Promise<any> {
        return this.unitRepository.save(unit)
    }

    async delete(code: string) {
        return this.unitRepository.delete(code)
    }
}
