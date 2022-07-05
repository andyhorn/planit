import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/create-user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
    private logger: Logger = new Logger('UsersService');

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {
        this.logger.verbose('Initialized');
    }

    public create(createUserDto: CreateUserDto): Promise<User> {
        this.logger.verbose('Creating new user');
        this.logger.debug(createUserDto);

        const user = this.usersRepository.create({
            email: createUserDto.email,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName
        });

        this.logger.debug(user);
        return this.usersRepository.save(user);
    }

    public async find(id: number): Promise<User> {
        this.logger.verbose('Retrieving user');
        this.logger.debug(id);

        const user = await this.usersRepository.findOne({
            where: { id },
            relations: {
                room: true,
                availability: true,
                messages: true
            }
        });

        if (!user) {
            this.logger.error('User not found');
            throw new NotFoundException(`No user with id: ${id}`);
        }

        this.logger.verbose('User found');
        this.logger.debug(user);
        return user;
    }

    public async findBySocket(socketId: string): Promise<User> {
        this.logger.verbose('Finding user by socket ID');
        this.logger.debug(socketId);

        const user = await this.usersRepository.findOne({
            where: { socketId },
            relations: {
                room: true,
                availability: true,
                messages: true
            }
        });

        if (!user) {
            this.logger.error('User not found');
            throw new NotFoundException(`No user with socket id: ${socketId}`);
        }

        this.logger.debug(user);
        return user;
    }

    public async update(update: User): Promise<User> {
        this.logger.verbose('Updating user');
        this.logger.debug(update);

        const user = await this.find(update.id);
        Object.assign(user, update);

        this.logger.debug(user);
        return this.usersRepository.save(user);
    }

    public async remove(id: number): Promise<void> {
        this.logger.verbose('Removing user');
        this.logger.debug(id);

        const user = await this.find(id);
        await this.usersRepository.remove(user);
    }

    public async removeAll(ids: number[]): Promise<void> {
        this.logger.verbose('Removing list of users');
        this.logger.debug(ids);

        await this.usersRepository.createQueryBuilder()
            .delete()
            .whereInIds(ids)
            .execute();
    }
}
