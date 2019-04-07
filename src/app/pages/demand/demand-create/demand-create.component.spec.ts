import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandCreateComponent } from './demand-create.component';

describe('DemandCreateComponent', () => {
  let component: DemandCreateComponent;
  let fixture: ComponentFixture<DemandCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
