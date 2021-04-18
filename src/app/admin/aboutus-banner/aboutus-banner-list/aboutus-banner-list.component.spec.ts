import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusBannerListComponent } from './aboutus-banner-list.component';

describe('AboutusBannerListComponent', () => {
  let component: AboutusBannerListComponent;
  let fixture: ComponentFixture<AboutusBannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutusBannerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
