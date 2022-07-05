import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/message.entity';
import { MessagesService } from './services/messages.service';
import { MessagesGateway } from './gateways/messages.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        UsersModule
    ],
    providers: [MessagesService, MessagesGateway],
    exports: [MessagesService]
})
export class MessagesModule { }
