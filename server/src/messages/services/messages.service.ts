import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../models/create-message.dto';
import { Message } from '../models/message.entity';

@Injectable()
export class MessagesService {
    private logger: Logger = new Logger('MessagesService');

    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>
    ) { }

    public create(createMessageDto: CreateMessageDto): Promise<Message> {
        this.logger.verbose('Creating new message');
        const message = this.messageRepository.create({
            content: createMessageDto.content,
            user: createMessageDto.user
        });

        this.logger.verbose('Saving to repository');
        return this.messageRepository.save(message);
    }

    public async removeForUsers(userIds: number[]): Promise<void> {
        this.logger.verbose('Removing messages for all users');
        this.logger.debug(userIds);

        await this.messageRepository.createQueryBuilder()
            .delete()
            .where('userId IN (:userIds)', { userIds })
            .execute();
    }
}
