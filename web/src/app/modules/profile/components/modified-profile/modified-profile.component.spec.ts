import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedProfileComponent } from './modified-profile.component';

describe('ModifiedProfileComponent', () => {
  let component: ModifiedProfileComponent;
  let fixture: ComponentFixture<ModifiedProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiedProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
