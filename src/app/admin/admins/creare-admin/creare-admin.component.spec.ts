import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareAdminComponent } from './creare-admin.component';

describe('CreareAdminComponent', () => {
  let component: CreareAdminComponent;
  let fixture: ComponentFixture<CreareAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreareAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreareAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
