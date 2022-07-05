import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/services/users.service';
import { constants } from '../../config/constants';
import { NewMessageDto } from '../models/new-message.dto';
import { SendMessageDto } from '../models/send-message.dto';
import { MessagesService } from '../services/messages.service';

@WebSocketGateway({
  namespace: '/api/v1/messages'
})
export class MessagesGateway implements OnGatewayInit {
  private logger: Logger = new Logger('MessagesGateway');

  constructor(
    private usersService: UsersService,
    private messagesService: MessagesService
  ) { }

  public afterInit() {
    this.logger.log('Initialized');
  }

  @SubscribeMessage(constants.events.messageFromClient)
  public async handleSendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() sendMessageDto: SendMessageDto
  ) {
    this.logger.log('Received message from client');
    this.logger.debug(`Socket ID: ${socket.id}`);

    const user = await this.usersService.findBySocket(socket.id);
    const message = await this.messagesService.create({
      content: sendMessageDto.content,
      user: user
    });
    this.logger.log('Message saved');

    this.logger.log('Emitting message to room');
    const dto = NewMessageDto.fromMessage(message);
    socket.emit(constants.events.messageToClient, dto);
    socket.to(user.room.code).emit(constants.events.messageToClient, dto);
  }
}
