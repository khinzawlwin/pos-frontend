import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockQtyComponent } from './stock-qty.component';

describe('StockQtyComponent', () => {
  let component: StockQtyComponent;
  let fixture: ComponentFixture<StockQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
