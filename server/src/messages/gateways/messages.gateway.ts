import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/services/users.service';
import { constants } from '../../config/constants';
import { NewMessageDto } from '../models/new-message.dto';
import { SendMessageDto } from '../models/send-message.dto';
import { MessagesService } from '../services/messages.service';

@WebSocketGateway({
  namespace: '/api/v1/messages'
})
export class MessagesGateway {
  constructor(
    private usersService: UsersService,
    private messagesService: MessagesService
  ) { }

  @SubscribeMessage(constants.events.SEND_MESSAGE)
  public async handleSendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() sendMessageDto: SendMessageDto) {
    const user = await this.usersService.findBySocket(socket.id);
    const message = await this.messagesService.create({
      content: sendMessageDto.content,
      user: user
    });

    const dto = NewMessageDto.fromMessage(message);
    socket.emit(constants.events.NEW_MESSAGE, dto);
    socket.to(user.room.code).emit(constants.events.NEW_MESSAGE, dto);
  }
}
