import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReletedProductComponent } from './releted-product.component';

describe('ReletedProductComponent', () => {
  let component: ReletedProductComponent;
  let fixture: ComponentFixture<ReletedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReletedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReletedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
