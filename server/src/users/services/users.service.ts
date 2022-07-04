import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/create-user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }

    public create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create({
            email: createUserDto.email,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName
        });

        return this.usersRepository.save(user);
    }

    public async find(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException(`No user with id: ${id}`);
        }

        return user;
    }

    public async remove(id: number): Promise<void> {
        const user = await this.find(id);
        await this.usersRepository.remove(user);
    }
}
