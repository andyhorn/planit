import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './models/room.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
    ]
})
export class RoomsModule { }
