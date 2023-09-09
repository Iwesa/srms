import { Units } from "src/units/units.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Students {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    regNo: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Units, (unit) => unit.student)
    units: Units[]
}