import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTotalComponent } from './sales-total.component';

describe('SalesTotalComponent', () => {
  let component: SalesTotalComponent;
  let fixture: ComponentFixture<SalesTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
