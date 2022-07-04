import { User } from "../../users/models/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @OneToMany(() => User, user => user.room)
    users: User[];

    public isActive(): boolean {
        return this.users.some(user => user.active);
    }
}