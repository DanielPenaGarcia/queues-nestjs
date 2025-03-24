import { Test, TestingModule } from '@nestjs/testing';
import { LineGateway } from './line.gateway';

describe('TurnsGateway', () => {
  let gateway: LineGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineGateway],
    }).compile();

    gateway = module.get<LineGateway>(LineGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
