import { Message } from "./message.entity";

export class NewMessageDto {
    content: string;
    userId: number;

    public static fromMessage(message: Message): NewMessageDto {
        return {
            content: message.content,
            userId: message.user.id
        };
    }
}