import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerListComponent } from './home-banner-list.component';

describe('HomeBannerListComponent', () => {
  let component: HomeBannerListComponent;
  let fixture: ComponentFixture<HomeBannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBannerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
