import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormBritishNationalityComponent } from './qcm-form-british-nationality.component';

describe('QcmFormBritishNationalityComponent', () => {
  let component: QcmFormBritishNationalityComponent;
  let fixture: ComponentFixture<QcmFormBritishNationalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmFormBritishNationalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormBritishNationalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
