import { Controller, Get } from '@nestjs/common';
import { AvailabilityService } from '../services/availability.service';

@Controller('api/v1/availability')
export class AvailabilityController {
    constructor(private availabilityService: AvailabilityService) { }
}
