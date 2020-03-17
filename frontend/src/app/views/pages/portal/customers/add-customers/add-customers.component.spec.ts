import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomersComponent } from './add-customers.component';

describe('AddCustomersComponent', () => {
  let component: AddCustomersComponent;
  let fixture: ComponentFixture<AddCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
