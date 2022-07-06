import { User } from "./user.entity";

export class GetUserDto {
    firstName: string;
    lastName: string;
    id: number;

    public static fromUser(user: User): GetUserDto {
        return <GetUserDto>{
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id
        };
    }
}