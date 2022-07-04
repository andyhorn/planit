import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { constants } from '../../config/constants';
import { Socket } from 'socket.io';
import { JoinRoomDto } from '../models/join-room.dto';
import { UsersService } from 'src/users/services/users.service';
import { RoomsService } from '../services/rooms.service';
import { GetUserDto } from 'src/users/models/get-user.dto';

@WebSocketGateway()
export class RoomsGateway {
  constructor(private usersService: UsersService, private roomsService: RoomsService) { }

  @SubscribeMessage(constants.events.JOIN_ROOM)
  public async handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() message: JoinRoomDto) {
    const user = await this.usersService.find(message.userId);
    const room = await this.roomsService.findByCode(message.roomCode);

    user.room = room;
    user.socketId = socket.id;
    await this.usersService.update(user);

    socket.join(room.code);
    socket.to(room.code).emit(constants.events.NEW_USER, GetUserDto.fromUser(user));
    socket.emit(constants.events.ALL_MESSAGES, room.users.map(user => user.messages).reduce((messages, userMessages) => [...messages, ...userMessages], []));
  }
}
