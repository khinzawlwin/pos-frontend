import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQtyComponent } from './product-qty.component';

describe('ProductQtyComponent', () => {
  let component: ProductQtyComponent;
  let fixture: ComponentFixture<ProductQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
