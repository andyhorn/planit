import { User } from "./user.entity";

export class GetUserDto {
    firstName: string;
    lastName: string;
    email: string;
    id: number;

    public static fromUser(user: User): GetUserDto {
        return <GetUserDto>{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user.id
        };
    }
}