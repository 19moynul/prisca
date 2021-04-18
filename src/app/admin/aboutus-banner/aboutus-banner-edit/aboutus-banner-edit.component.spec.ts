import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusBannerEditComponent } from './aboutus-banner-edit.component';

describe('AboutusBannerEditComponent', () => {
  let component: AboutusBannerEditComponent;
  let fixture: ComponentFixture<AboutusBannerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutusBannerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusBannerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
