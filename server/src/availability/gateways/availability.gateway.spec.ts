import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityGateway } from './availability.gateway';

describe('AvailabilityGateway', () => {
  let gateway: AvailabilityGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailabilityGateway],
    }).compile();

    gateway = module.get<AvailabilityGateway>(AvailabilityGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
