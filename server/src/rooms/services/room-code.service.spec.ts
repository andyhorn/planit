import { Test, TestingModule } from '@nestjs/testing';
import { RoomCodeService } from './room-code.service';

describe('RoomCodeService', () => {
  let service: RoomCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomCodeService],
    }).compile();

    service = module.get<RoomCodeService>(RoomCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
