import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/message.entity';
import { MessagesService } from './services/messages.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message])
    ],
    providers: [MessagesService],
    exports: [MessagesService]
})
export class MessagesModule { }
