import { Test, TestingModule } from '@nestjs/testing';
import { QueueSchedulingService } from './queue-scheduling.service';

describe('QueueSchedulingService', () => {
  let service: QueueSchedulingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueSchedulingService],
    }).compile();

    service = module.get<QueueSchedulingService>(QueueSchedulingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
