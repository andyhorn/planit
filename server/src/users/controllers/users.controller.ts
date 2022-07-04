import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../models/create-user.dto';
import { GetUserDto } from '../models/get-user.dto';
import { UsersService } from '../services/users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Post()
    public createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
        return this.usersService.create(createUserDto);
    }
}
