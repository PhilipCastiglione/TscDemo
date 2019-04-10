import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Flange} from "./Flange";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(type => Flange, flange => flange.user, {cascade: true})
    flanges: Flange[];

}
