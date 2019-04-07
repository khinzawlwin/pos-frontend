import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQtyComponent } from './sales-qty.component';

describe('SalesQtyComponent', () => {
  let component: SalesQtyComponent;
  let fixture: ComponentFixture<SalesQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
