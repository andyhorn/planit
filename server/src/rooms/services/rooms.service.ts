import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../models/create-room.dto';
import { Room } from '../models/room.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private roomsRepository: Repository<Room>) { }

    public create(createRoomDto: CreateRoomDto): Promise<Room> {
        const code = this.generateCode();
        const room = this.roomsRepository.create({
            code,
            name: createRoomDto.name
        });

        return this.roomsRepository.save(room);
    }

    public async findById(id: number): Promise<Room> {
        const room = await this.roomsRepository.findOneBy({ id });

        if (!room) {
            throw new NotFoundException(`No room with id: ${id}`);
        }

        return room;
    }

    public async findByCode(code: string): Promise<Room> {
        const room = await this.roomsRepository.findOneBy({ code });

        if (!room) {
            throw new NotFoundException(`No room with code: ${code}`);
        }

        return room;
    }

    public async remove(id: number): Promise<void> {
        const room = await this.findById(id);
        this.roomsRepository.remove(room);
    }

    private generateCode(): string {
        return randomBytes(16).toString('hex');
    }
}
