import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLaterComponent } from './news-later.component';

describe('NewsLaterComponent', () => {
  let component: NewsLaterComponent;
  let fixture: ComponentFixture<NewsLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsLaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
