import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User";

@Entity()
export class Flange {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    description: string;

    @Column()
    usesBeforeSelfDestruction: number;

    @Column()
    isFun: boolean;

    @ManyToOne(type => User, user => user.flanges)
    user: User;

}
