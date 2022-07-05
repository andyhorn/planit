import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/services/users.service';
import { constants } from '../../config/constants';
import { NewAvailabilityDto } from '../models/new-availability.dto';
import { SetAvailabilityDto } from '../models/set-availability.dto';
import { AvailabilityService } from '../services/availability.service';

@WebSocketGateway({
  namespace: '/api/v1/availability',
})
export class AvailabilityGateway implements OnGatewayInit {
  private logger: Logger = new Logger('AvailabilityGateway');

  constructor(
    private usersService: UsersService,
    private availabilityService: AvailabilityService,
  ) { }

  afterInit() {
    this.logger.log('Initialized');
  }

  @SubscribeMessage(constants.events.availabilityFromClient)
  public async handleSetAvailability(
    @ConnectedSocket() socket: Socket,
    @MessageBody() setAvailabilityDto: SetAvailabilityDto,
  ) {
    const user = await this.usersService.findBySocket(socket.id);
    let dto: NewAvailabilityDto;

    if (setAvailabilityDto.selected) {
      this.logger.log(`Adding availability for user ${user.id} on ${setAvailabilityDto.date}`);
      const availability = await this.availabilityService.create({
        date: setAvailabilityDto.date,
        user: user,
      });

      dto = NewAvailabilityDto.addAvailability(availability);
    } else {
      const availability = await this.availabilityService.findByDateAndUser(
        setAvailabilityDto.date,
        user,
      );
      this.logger.log(`Removing availability for user ${user.id} on ${availability.date}`);
      await this.availabilityService.remove(availability.id);

      dto = NewAvailabilityDto.removeAvailability(availability);
    }

    socket.to(user.room.code).emit(constants.events.availabilityToClient, dto);
  }
}
