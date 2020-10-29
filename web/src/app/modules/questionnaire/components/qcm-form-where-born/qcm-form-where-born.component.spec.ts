import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormWhereBornComponent } from './qcm-form-where-born.component';

describe('QcmFormWhereBornComponent', () => {
  let component: QcmFormWhereBornComponent;
  let fixture: ComponentFixture<QcmFormWhereBornComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmFormWhereBornComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormWhereBornComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
