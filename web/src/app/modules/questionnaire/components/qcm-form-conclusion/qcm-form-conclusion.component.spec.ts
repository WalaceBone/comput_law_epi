import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormConclusionComponent } from './qcm-form-conclusion.component';

describe('QcmFormConclusionComponent', () => {
  let component: QcmFormConclusionComponent;
  let fixture: ComponentFixture<QcmFormConclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmFormConclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormConclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
