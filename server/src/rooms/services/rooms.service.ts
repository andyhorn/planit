import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/messages/models/message.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../models/create-room.dto';
import { Room } from '../models/room.entity';
import { RoomCodeService } from './room-code.service';

@Injectable()
export class RoomsService {
    private logger: Logger = new Logger('RoomsService');

    constructor(
        @InjectRepository(Room) private roomsRepository: Repository<Room>,
        private roomCodeService: RoomCodeService
    ) {
        this.logger.verbose('Initialized');
    }

    public async create(createRoomDto: CreateRoomDto): Promise<Room> {
        this.logger.verbose('Creating new room')
        const code = await this.generateUniqueCode();
        const room = this.roomsRepository.create({
            code,
            name: createRoomDto.name
        });

        this.logger.verbose(`Room created`);
        this.logger.debug(`Code: ${code}`);
        return this.roomsRepository.save(room);
    }

    public async findById(id: number): Promise<Room> {
        this.logger.verbose('Searching for room by ID');
        this.logger.debug(`ID: ${id}`);

        const room = await this.roomsRepository.findOne({
            relations: {
                users: true,
            },
            where: { id }
        });

        if (!room) {
            this.logger.error('Room not found');
            throw new NotFoundException(`No room with ID: ${id}`);
        }

        this.logger.debug(room);
        return room;
    }

    public async findByCode(code: string): Promise<Room> {
        this.logger.verbose('Searching for room by code');
        this.logger.debug(`Code: ${code}`);

        const room = await this.roomsRepository.findOne({
            where: {
                code
            },
            relations: {
                users: true
            }
        });

        if (!room) {
            this.logger.error('Room not found');
            throw new NotFoundException(`No room found with code: ${code}`);
        }

        this.logger.debug(room);
        return room;
    }

    public async getAllMessages(id: number): Promise<Message[]> {
        this.logger.verbose(`Retrieving all messages for room`);
        this.logger.debug(`ID: ${id}`)

        const room = await this.findById(id);
        const messages = room.users
            .map(user => user.messages || [])
            .reduce((collection, userMessages) => [...collection, ...userMessages], []);

        this.logger.verbose(`Found ${messages.length} messages`);
        return messages;
    }

    public async remove(id: number): Promise<void> {
        this.logger.verbose('Deleting room');
        this.logger.debug(`ID: ${id}`);

        const room = await this.findById(id);
        this.roomsRepository.remove(room);
    }

    private async generateUniqueCode(): Promise<string> {
        let code: string = '';
        let isUnique: boolean;

        this.logger.verbose('Generating unique room code')
        do {
            code = this.roomCodeService.generateCode();
            isUnique = (await this.roomsRepository.countBy({ code })) === 0;
        } while (!isUnique);

        this.logger.debug(`Code: ${code}`);
        return code;
    }
}
