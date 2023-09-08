import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UnitsService } from './units.service';
import { Unit } from './units.model';
import { StudentsService } from 'src/students/students.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) { }

  @Post()
  async create(unit: Unit) {
    return await this.unitsService.create(unit)
  }

  @Get()
  async findAll(): Promise<Unit[]> {
    return this.unitsService.findAll()
  }

  @Get('unit:code')
  async findOne(@Param() param): Promise<Unit> {
    return this.unitsService.findOne(param.code)
  }

  @Post(':id/student')
  async createUnits(@Param('id') id: number, @Body() unit: Unit): Promise<any> {
    return this.unitsService.createUnits(id, unit)
  }

  @Get(':id/student')
  async getUnits(@Param('id') id: number): Promise<any> {
    return this.unitsService.getUnits(id);
  }

  @Post(':code/update')
  async update(@Param('code') code: string, @Body() unit: Unit) {
    unit.code = code
    return this.unitsService.update(unit)
  }

  @Post(':code/delete')
  async delete(@Param('code') code: string) {
    return this.unitsService.delete(code)
  }
}
