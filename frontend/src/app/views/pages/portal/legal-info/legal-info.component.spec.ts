import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalInfoComponent } from './legal-info.component';

describe('LegalInfoComponent', () => {
  let component: LegalInfoComponent;
  let fixture: ComponentFixture<LegalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
