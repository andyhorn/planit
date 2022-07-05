import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { Availability } from '../models/availability.entity';
import { CreateAvailabilityDto } from '../models/create-availability.dto';

@Injectable()
export class AvailabilityService {
    constructor(
        @InjectRepository(Availability) private availabilityRepository: Repository<Availability>
    ) { }

    public create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
        const availability = this.availabilityRepository.create({
            date: createAvailabilityDto.date,
            user: createAvailabilityDto.user
        });

        return this.availabilityRepository.save(availability);
    }

    public async findByDateAndUser(date: Date, user: User): Promise<Availability> {
        return await this.availabilityRepository.createQueryBuilder()
            .select('*')
            .where('date = :date')
            .andWhere('userId = :userId')
            .setParameters({ date, userId: user.id })
            .getOneOrFail();
    }

    public async remove(id: number): Promise<void> {
        const availability = await this.find(id);
        await this.availabilityRepository.remove(availability);
    }

    public async removeAllForUsers(userIds: number[]): Promise<void> {
        await this.availabilityRepository.createQueryBuilder()
            .delete()
            .where('userId in (:userIds)', { userIds })
            .execute();
    }

    private async find(id: number): Promise<Availability> {
        const availability = await this.availabilityRepository.findOneBy({ id });
        return availability;
    }
}
