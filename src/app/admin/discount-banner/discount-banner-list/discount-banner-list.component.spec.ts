import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountBannerListComponent } from './discount-banner-list.component';

describe('DiscountBannerListComponent', () => {
  let component: DiscountBannerListComponent;
  let fixture: ComponentFixture<DiscountBannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountBannerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
