import { Students } from "src/students/students.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Units {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    cat1: number;

    @Column({ nullable: true })
    cat2: number;

    @Column({ nullable: true })
    exam: number;

    @ManyToOne(() => Students, (student) => student.units, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    student: Students
}