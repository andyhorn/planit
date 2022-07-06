import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CreateRoomDto } from '../models/create-room.dto';
import { RoomDto } from '../models/room.dto';
import { RoomsService } from '../services/rooms.service';

@Controller('api/v1/rooms')
export class RoomsController {
    private logger: Logger = new Logger('RoomsController');
    constructor(private roomsService: RoomsService) {
        this.logger.log('Initialized');
    }

    @Post()
    public createRoom(@Body() createRoomDto: CreateRoomDto) {
        this.logger.log('Creating new room');
        return this.roomsService.create(createRoomDto);
    }

    @Get('/:code')
    public async getRoomData(@Param('code') code: string): Promise<RoomDto> {
        this.logger.log('Retrieving data for room');
        this.logger.debug(code);

        const room = await this.roomsService.findByCode(code);
        return <RoomDto>{
            code: code,
            name: room.name,
            users: room.users.map(user => user.id)
        };
    }
}
