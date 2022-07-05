import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { AvailabilityDto } from 'src/availability/models/availability.dto';
import { MessageDto } from 'src/messages/models/message.dto';
import { CreateUserDto } from '../models/create-user.dto';
import { GetUserDto } from '../models/get-user.dto';
import { UserDto } from '../models/user.dto';
import { UsersService } from '../services/users.service';

@Controller('api/v1/users')
export class UsersController {
    private logger: Logger = new Logger('UsersController');

    constructor(
        private usersService: UsersService
    ) {
        this.logger.log('Initialized');
    }

    @Post()
    public createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
        this.logger.log('Creating new user');
        this.logger.debug(createUserDto);
        return this.usersService.create(createUserDto);
    }

    @Get('/:id')
    public async getUser(
        @Param('id') id: string,
        @Query('messages') includeMessages: string,
        @Query('availability') includeAvailability: string
    ): Promise<UserDto> {
        this.logger.log('Retrieving user');
        this.logger.debug(`ID: ${id}`);
        this.logger.debug(`Include messages? ${includeMessages}`);
        this.logger.debug(`Include availability? ${includeAvailability}`);

        const user = await this.usersService.find(parseInt(id));
        return <UserDto>{
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            messages: includeMessages?.length && user.messages.map(message => <MessageDto>{
                content: message.content,
                userId: user.id
            }),
            availability: includeAvailability?.length && user.availability.map(availability => <AvailabilityDto>{
                date: availability.date,
                userId: user.id
            })
        };
    }
}
