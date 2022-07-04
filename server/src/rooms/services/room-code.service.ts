import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class RoomCodeService {
    public generateCode(): string {
        return randomBytes(3).toString('hex').toUpperCase();
    }
}
