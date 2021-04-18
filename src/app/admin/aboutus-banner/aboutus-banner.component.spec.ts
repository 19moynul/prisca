import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusBannerComponent } from './aboutus-banner.component';

describe('AboutusBannerComponent', () => {
  let component: AboutusBannerComponent;
  let fixture: ComponentFixture<AboutusBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutusBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
