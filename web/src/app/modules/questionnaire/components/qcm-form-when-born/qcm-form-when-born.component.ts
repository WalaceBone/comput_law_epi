import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { when } from 'q';

@Component({
  selector: 'app-qcm-form-when-born',
  templateUrl: './qcm-form-when-born.component.html',
  styleUrls: ['./qcm-form-when-born.component.scss']
})
export class QcmFormWhenBornComponent implements OnInit {

  @Output() whenBornEvent = new EventEmitter<string>();

  public frm: FormGroup;
  public submitted: boolean;

  constructor(private fb: FormBuilder) {
    this.frm = fb.group({
      whenBorn: ['', Validators.required]
    });
    this.submitted = false;
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.submitted = true;

    if (this.frm.invalid) {
      return;
    }

    const whenBorn: string = this.frm.get('whenBorn').value;

    if (whenBorn.length !== 10) {
      return;
    }

    this.whenBornEvent.emit(whenBorn);
  }

}
