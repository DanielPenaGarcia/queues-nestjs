import { Test, TestingModule } from '@nestjs/testing';
import { TurnsGateway } from './turns.gateway';

describe('TurnsGateway', () => {
  let gateway: TurnsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnsGateway],
    }).compile();

    gateway = module.get<TurnsGateway>(TurnsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
