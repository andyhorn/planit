import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { Availability } from '../models/availability.entity';
import { CreateAvailabilityDto } from '../models/create-availability.dto';

@Injectable()
export class AvailabilityService {
    private logger: Logger = new Logger('AvailabilityService');

    constructor(
        @InjectRepository(Availability) private availabilityRepository: Repository<Availability>
    ) { }

    public create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
        this.logger.verbose(`Creating new availability for user ${createAvailabilityDto.user} on ${createAvailabilityDto.date}`);

        const availability = this.availabilityRepository.create({
            date: createAvailabilityDto.date,
            user: createAvailabilityDto.user
        });

        return this.availabilityRepository.save(availability);
    }

    public async findByDateAndUser(date: Date, user: User): Promise<Availability> {
        this.logger.verbose(`Retrieving availability for user ${user.id} on ${date}`);

        return await this.availabilityRepository.createQueryBuilder()
            .select('*')
            .where('date = :date')
            .andWhere('userId = :userId')
            .setParameters({ date, userId: user.id })
            .getOneOrFail();
    }

    public async remove(id: number): Promise<void> {
        this.logger.verbose(`Removing availability with id: ${id}`);

        const availability = await this.find(id);
        await this.availabilityRepository.remove(availability);
    }

    public async removeAllForUsers(userIds: number[]): Promise<void> {
        this.logger.verbose(`Removing all availabilities for users: ${userIds}`);

        await this.availabilityRepository.createQueryBuilder()
            .delete()
            .where('userId in (:userIds)', { userIds })
            .execute();
    }

    private async find(id: number): Promise<Availability> {
        this.logger.verbose(`Finding availability with id: ${id}`);

        const availability = await this.availabilityRepository.findOneBy({ id });
        return availability;
    }
}
