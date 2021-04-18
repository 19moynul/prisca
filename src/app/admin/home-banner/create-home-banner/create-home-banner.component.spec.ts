import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHomeBannerComponent } from './create-home-banner.component';

describe('CreateHomeBannerComponent', () => {
  let component: CreateHomeBannerComponent;
  let fixture: ComponentFixture<CreateHomeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHomeBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHomeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
