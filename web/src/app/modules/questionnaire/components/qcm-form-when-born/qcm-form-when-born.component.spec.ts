import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormWhenBornComponent } from './qcm-form-when-born.component';

describe('QcmFormWhenBornComponent', () => {
  let component: QcmFormWhenBornComponent;
  let fixture: ComponentFixture<QcmFormWhenBornComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmFormWhenBornComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormWhenBornComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
