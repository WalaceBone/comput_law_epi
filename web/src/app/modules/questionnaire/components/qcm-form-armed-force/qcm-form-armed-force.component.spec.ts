import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormArmedForceComponent } from './qcm-form-armed-force.component';

describe('QcmFormArmedForceComponent', () => {
  let component: QcmFormArmedForceComponent;
  let fixture: ComponentFixture<QcmFormArmedForceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcmFormArmedForceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormArmedForceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
