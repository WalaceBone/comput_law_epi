import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormLeaveContryComponent } from './qcm-form-leave-contry.component';

describe('QcmFormLeaveContryComponent', () => {
  let component: QcmFormLeaveContryComponent;
  let fixture: ComponentFixture<QcmFormLeaveContryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmFormLeaveContryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormLeaveContryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
