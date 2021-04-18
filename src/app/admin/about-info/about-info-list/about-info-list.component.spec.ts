import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutInfoListComponent } from './about-info-list.component';

describe('AboutInfoListComponent', () => {
  let component: AboutInfoListComponent;
  let fixture: ComponentFixture<AboutInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
