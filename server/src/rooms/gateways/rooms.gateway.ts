import { ConnectedSocket, MessageBody, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { constants } from '../../config/constants';
import { Socket } from 'socket.io';
import { JoinRoomDto } from '../models/join-room.dto';
import { UsersService } from 'src/users/services/users.service';
import { RoomsService } from '../services/rooms.service';
import { GetUserDto } from 'src/users/models/get-user.dto';
import { MessagesService } from 'src/messages/services/messages.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: '/api/v1/room'
})
export class RoomsGateway implements OnGatewayDisconnect, OnGatewayInit {
  private logger: Logger = new Logger('RoomsGateway');

  constructor(
    private usersService: UsersService,
    private roomsService: RoomsService,
    private messagesService: MessagesService
  ) { }

  public afterInit() {
    this.logger.log('Initialized');
  }

  public async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log('Client disconnected');

    const user = await this.usersService.findBySocket(socket.id);
    user.active = false;
    await this.usersService.update(user);
    this.logger.verbose(`User set to inactive`);
    this.logger.debug(user.id);

    const room = await this.roomsService.findById(user.room.id);
    if (!room.isActive()) {
      this.logger.log(`Room is empty - destroying...`)
      this.logger.debug(room.code);

      const userIds = room.users.map(user => user.id);
      await this.messagesService.removeForUsers(userIds);
      await this.usersService.removeAll(userIds);
      await this.roomsService.remove(room.id);

      this.logger.log('Room destroyed');
    }
  }

  @SubscribeMessage(constants.events.joinRoom)
  public async handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() joinRoomDto: JoinRoomDto) {
    this.logger.log('User joining room');
    const user = await this.usersService.find(joinRoomDto.userId);
    const room = await this.roomsService.findByCode(joinRoomDto.roomCode);
    this.logger.debug(`User: ${user.id}`);
    this.logger.debug(`Room: ${room.id}`);

    user.room = room;
    user.socketId = socket.id;
    user.active = true;
    await this.usersService.update(user);
    this.logger.verbose('User joined room');

    socket.join(room.code);
    socket.to(room.code).emit(constants.events.newUser, GetUserDto.fromUser(user));
  }
}
