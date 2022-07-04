import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomDto } from '../models/create-room.dto';
import { RoomsService } from '../services/rooms.service';

@Controller('api/v1/rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) { }

    @Post()
    public createRoom(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }
}
