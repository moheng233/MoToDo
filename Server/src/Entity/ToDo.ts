import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ToDo {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    msg: string = "";

    @Column('boolean')
    del: boolean = false;
}