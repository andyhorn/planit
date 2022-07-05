import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { constants } from '../../config/constants';
import { Socket } from 'socket.io';
import { JoinRoomDto } from '../models/join-room.dto';
import { UsersService } from 'src/users/services/users.service';
import { RoomsService } from '../services/rooms.service';
import { GetUserDto } from 'src/users/models/get-user.dto';
import { MessagesService } from 'src/messages/services/messages.service';

@WebSocketGateway({
  namespace: '/api/v1/room'
})
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
    user.active = true;
    await this.usersService.update(user);

    socket.join(room.code);
    socket.to(room.code).emit(constants.events.NEW_USER, GetUserDto.fromUser(user));
  }
}
