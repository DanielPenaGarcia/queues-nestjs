import { TestBed } from '@angular/core/testing';

import { BuyingTicketsService } from './buying-tickets.service';

describe('BuyingTicketsService', () => {
  let service: BuyingTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyingTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
