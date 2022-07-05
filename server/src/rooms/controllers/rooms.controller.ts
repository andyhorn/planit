import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoomDto } from '../models/create-room.dto';
import { RoomDto } from '../models/room.dto';
import { RoomsService } from '../services/rooms.service';

@Controller('api/v1/rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) { }

    @Post()
    public createRoom(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }

    @Get('/:code')
    public async getRoomData(@Param('code') code: string): Promise<RoomDto> {
        const room = await this.roomsService.findByCode(code);
        return <RoomDto>{
            code: code,
            users: room.users.map(user => user.id)
        };
    }
}
