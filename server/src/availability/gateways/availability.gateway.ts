import {
  ConnectedSocket,
  MessageBody,
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
export class AvailabilityGateway {
  constructor(
    private usersService: UsersService,
    private availabilityService: AvailabilityService,
  ) { }

  @SubscribeMessage(constants.events.SET_AVAILABILITY)
  public async handleSetAvailability(
    @ConnectedSocket() socket: Socket,
    @MessageBody() setAvailabilityDto: SetAvailabilityDto,
  ) {
    const user = await this.usersService.findBySocket(socket.id);
    let dto: NewAvailabilityDto;

    if (setAvailabilityDto.selected) {
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
      await this.availabilityService.remove(availability.id);

      dto = NewAvailabilityDto.removeAvailability(availability);
    }

    socket.to(user.room.code).emit(constants.events.NEW_AVAILABILITY, dto);
  }
}
