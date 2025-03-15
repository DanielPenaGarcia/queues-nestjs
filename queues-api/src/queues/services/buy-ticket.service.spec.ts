import { Test, TestingModule } from '@nestjs/testing';
import { BuyTicketService } from './buy-ticket.service';

describe('BuyTicketService', () => {
  let service: BuyTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyTicketService],
    }).compile();

    service = module.get<BuyTicketService>(BuyTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
