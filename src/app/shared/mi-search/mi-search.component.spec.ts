import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiSearchComponent } from './mi-search.component';

describe('MiSearchComponent', () => {
  let component: MiSearchComponent;
  let fixture: ComponentFixture<MiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
