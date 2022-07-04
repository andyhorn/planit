import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './models/room.entity';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers/rooms.controller';
import { RoomCodeService } from './services/room-code.service';
import { RoomsGateway } from './gateways/rooms.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
        UsersModule
    ],
    providers: [RoomsService, RoomCodeService, RoomsGateway],
    controllers: [RoomsController]
})
export class RoomsModule { }
