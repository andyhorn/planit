import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './models/room.entity';
import { RoomsService } from './services/rooms.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
    ],
    providers: [RoomsService]
})
export class RoomsModule { }
