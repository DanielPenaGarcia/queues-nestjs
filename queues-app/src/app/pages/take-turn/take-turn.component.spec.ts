import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeTurnComponent } from './take-turn.component';

describe('TakeTurnComponent', () => {
  let component: TakeTurnComponent;
  let fixture: ComponentFixture<TakeTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeTurnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
