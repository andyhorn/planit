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
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: {
                room: true
            }
        });

        if (!user) {
            throw new NotFoundException(`No user with id: ${id}`);
        }

        return user;
    }

    public async findBySocket(socketId: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { socketId },
            relations: {
                room: true
            }
        });

        if (!user) {
            throw new NotFoundException(`No user with socket id: ${socketId}`);
        }

        return user;
    }

    public async update(update: User): Promise<User> {
        const user = await this.find(update.id);
        Object.assign(user, update);
        return this.usersRepository.save(user);
    }

    public async remove(id: number): Promise<void> {
        const user = await this.find(id);
        await this.usersRepository.remove(user);
    }
}
