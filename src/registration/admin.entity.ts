import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}