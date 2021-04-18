import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFooterCardComponent } from './create-footer-card.component';

describe('CreateFooterCardComponent', () => {
  let component: CreateFooterCardComponent;
  let fixture: ComponentFixture<CreateFooterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFooterCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFooterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
