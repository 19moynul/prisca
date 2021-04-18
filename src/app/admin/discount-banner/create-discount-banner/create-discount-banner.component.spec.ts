import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscountBannerComponent } from './create-discount-banner.component';

describe('CreateDiscountBannerComponent', () => {
  let component: CreateDiscountBannerComponent;
  let fixture: ComponentFixture<CreateDiscountBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiscountBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiscountBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
