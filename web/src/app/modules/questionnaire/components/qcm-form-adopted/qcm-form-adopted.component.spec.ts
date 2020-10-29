import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormAdoptedComponent } from './qcm-form-adopted.component';

describe('QcmFormAdoptedComponent', () => {
  let component: QcmFormAdoptedComponent;
  let fixture: ComponentFixture<QcmFormAdoptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmFormAdoptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormAdoptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
