import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCardListComponent } from './footer-card-list.component';

describe('FooterCardListComponent', () => {
  let component: FooterCardListComponent;
  let fixture: ComponentFixture<FooterCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
