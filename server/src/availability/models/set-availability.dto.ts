import { IsBoolean, IsDate } from "class-validator";

export class SetAvailabilityDto {
    @IsDate()
    date: Date;

    @IsBoolean()
    selected: boolean;
}