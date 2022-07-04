import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { constants } from '../../config/constants';
import { Socket } from 'socket.io';
import { JoinRoomDto } from '../models/join-room.dto';
import { UsersService } from 'src/users/services/users.service';
import { RoomsService } from '../services/rooms.service';
import { GetUserDto } from 'src/users/models/get-user.dto';
import { SendMessageDto } from 'src/messages/models/send-message.dto';
import { MessagesService } from 'src/messages/services/messages.service';
import { NewMessageDto } from 'src/messages/models/new-message.dto';

@WebSocketGateway()
export class RoomsGateway implements OnGatewayDisconnect {
  constructor(
    private usersService: UsersService,
    private roomsService: RoomsService,
    private messagesService: MessagesService
  ) { }
  public async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = await this.usersService.findBySocket(socket.id);
    user.active = false;
    await this.usersService.update(user);

    const room = await this.roomsService.findById(user.room.id);
    if (!room.isActive()) {
      const userIds = room.users.map(user => user.id);
      await this.messagesService.removeForUsers(userIds);
      await this.usersService.removeAll(userIds);
      await this.roomsService.remove(room.id);
    }
  }

  @SubscribeMessage(constants.events.JOIN_ROOM)
  public async handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() joinRoomDto: JoinRoomDto) {
    const user = await this.usersService.find(joinRoomDto.userId);
    const room = await this.roomsService.findByCode(joinRoomDto.roomCode);

    user.room = room;
    user.socketId = socket.id;
    await this.usersService.update(user);

    socket.join(room.code);
    socket.to(room.code).emit(constants.events.NEW_USER, GetUserDto.fromUser(user));

    const allMessages = await this.roomsService.getAllMessages(room.id);
    socket.emit(constants.events.ALL_MESSAGES, allMessages);
  }

  @SubscribeMessage(constants.events.SEND_MESSAGE)
  public async handleSendMessage(@ConnectedSocket() socket: Socket, @MessageBody() sendMessageDto: SendMessageDto) {
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
