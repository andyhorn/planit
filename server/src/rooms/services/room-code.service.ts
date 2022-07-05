import { Injectable, Logger } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class RoomCodeService {
    private logger: Logger = new Logger('RoomCodeService');

    public generateCode(): string {
        this.logger.verbose('Generating new code');
        return randomBytes(3).toString('hex').toUpperCase();
    }
}
