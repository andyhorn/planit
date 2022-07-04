import { User } from "../../users/models/user.entity";

export class CreateMessageDto {
    content: string;
    user: User;
}