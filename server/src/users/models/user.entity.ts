import { Room } from "src/rooms/models/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @ManyToOne(() => Room, room => room.users, {
        nullable: true
    })
    room: Room;
}
