import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingTicketsComponent } from './buying-tickets.component';

describe('BuyingTicketsComponent', () => {
  let component: BuyingTicketsComponent;
  let fixture: ComponentFixture<BuyingTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyingTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
