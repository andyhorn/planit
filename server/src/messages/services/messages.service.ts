import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../models/create-message.dto';
import { Message } from '../models/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>
    ) { }

    public create(createMessageDto: CreateMessageDto): Promise<Message> {
        const message = this.messageRepository.create({
            content: createMessageDto.content,
            user: createMessageDto.user
        });

        return this.messageRepository.save(message);
    }

    public async removeForUsers(userIds: number[]): Promise<void> {
        await this.messageRepository.createQueryBuilder()
            .delete()
            .where('userId IN (:userIds)', { userIds })
            .execute();
    }
}
