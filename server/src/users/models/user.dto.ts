import { AvailabilityDto } from "src/availability/models/availability.dto";
import { MessageDto } from "src/messages/models/message.dto";

export class UserDto {
    id: number;
    firstName: string;
    lastName: string;
    messages?: MessageDto[];
    availability?: AvailabilityDto[];
}