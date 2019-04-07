import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenEditComponent } from './kitchen-edit.component';

describe('KitchenEditComponent', () => {
  let component: KitchenEditComponent;
  let fixture: ComponentFixture<KitchenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
