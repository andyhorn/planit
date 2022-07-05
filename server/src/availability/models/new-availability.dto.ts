import { Availability } from "./availability.entity";

export class NewAvailabilityDto {
    date: Date;
    userId: number;
    selected: boolean;

    public static addAvailability(availability: Availability): NewAvailabilityDto {
        return {
            date: availability.date,
            userId: availability.user.id,
            selected: true
        };
    }

    public static removeAvailability(availability: Availability): NewAvailabilityDto {
        return {
            date: availability.date,
            userId: availability.user.id,
            selected: false
        };
    }
}