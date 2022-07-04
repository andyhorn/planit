import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/messages/models/message.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../models/create-room.dto';
import { Room } from '../models/room.entity';
import { RoomCodeService } from './room-code.service';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room) private roomsRepository: Repository<Room>,
        private roomCodeService: RoomCodeService
    ) { }

    public async create(createRoomDto: CreateRoomDto): Promise<Room> {
        const code = await this.generateUniqueCode();
        const room = this.roomsRepository.create({
            code,
            name: createRoomDto.name
        });

        return this.roomsRepository.save(room);
    }

    public async findById(id: number): Promise<Room> {
        const room = await this.roomsRepository.findOne({
            relations: {
                users: true,
            },
            where: { id }
        });

        if (!room) {
            throw new NotFoundException(`No room with id: ${id}`);
        }

        return room;
    }

    public async findByCode(code: string): Promise<Room> {
        const room = await this.roomsRepository.findOne({
            where: {
                code
            },
            relations: {
                users: true
            }
        });

        if (!room) {
            throw new NotFoundException(`No room with code: ${code}`);
        }

        return room;
    }

    public async getAllMessages(id: number): Promise<Message[]> {
        const room = await this.findById(id);
        const messages = room.users
            .map(user => user.messages || [])
            .reduce((collection, userMessages) => [...collection, ...userMessages], []);
        return messages;
    }

    public async remove(id: number): Promise<void> {
        const room = await this.findById(id);
        this.roomsRepository.remove(room);
    }

    private async generateUniqueCode(): Promise<string> {
        let code: string = '';
        let isUnique: boolean;

        do {
            code = this.roomCodeService.generateCode();
            isUnique = (await this.roomsRepository.countBy({ code })) === 0;
        } while (!isUnique);

        return code;
    }
}
