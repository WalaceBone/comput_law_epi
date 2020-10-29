import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormLiveUkComponent } from './qcm-form-live-uk.component';

describe('QcmFormLiveUkComponent', () => {
  let component: QcmFormLiveUkComponent;
  let fixture: ComponentFixture<QcmFormLiveUkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmFormLiveUkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormLiveUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
