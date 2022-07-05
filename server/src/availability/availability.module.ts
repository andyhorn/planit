import { Module } from '@nestjs/common';
import { AvailabilityGateway } from './gateways/availability.gateway';
import { AvailabilityService } from './services/availability.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './models/availability.entity';

@Module({
  providers: [AvailabilityGateway, AvailabilityService],
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([Availability]),
    UsersModule
  ]
})
export class AvailabilityModule { }
