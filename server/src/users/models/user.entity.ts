import { Message } from "../../messages/models/message.entity";
import { Room } from "../../rooms/models/room.entity";
import { Availability } from "../../availability/models/availability.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        default: true
    })
    active: boolean;

    @Column({
        nullable: true
    })
    socketId: string;

    @ManyToOne(() => Room, room => room.users, {
        nullable: true
    })
    room: Room;

    @OneToMany(() => Message, message => message.user)
    messages: Message[];

    @OneToMany(() => Availability, availability => availability.user)
    availability: Availability[];
}
