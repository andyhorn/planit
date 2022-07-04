import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class JoinRoomDto {
    @IsString()
    roomCode: string;

    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    userId: number;
}