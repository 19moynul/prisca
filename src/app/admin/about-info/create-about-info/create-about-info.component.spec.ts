import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAboutInfoComponent } from './create-about-info.component';

describe('CreateAboutInfoComponent', () => {
  let component: CreateAboutInfoComponent;
  let fixture: ComponentFixture<CreateAboutInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAboutInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAboutInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
