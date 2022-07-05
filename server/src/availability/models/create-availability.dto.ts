import { User } from "../../users/models/user.entity";

export class CreateAvailabilityDto {
    date: Date;
    user: User;
}