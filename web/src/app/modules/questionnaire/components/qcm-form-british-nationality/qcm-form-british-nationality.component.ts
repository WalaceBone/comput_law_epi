import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qcm-form-british-nationality',
  templateUrl: './qcm-form-british-nationality.component.html',
  styleUrls: ['./qcm-form-british-nationality.component.scss']
})
export class QcmFormBritishNationalityComponent implements OnInit {

  @Output() isBritishNationalityEvent = new EventEmitter<boolean>();

  public reply: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  selected(event: boolean) {
    this.reply = event;
  }

  submit() {
    if (this.reply === undefined) {
      return;
    }
    this.isBritishNationalityEvent.emit(this.reply);
  }

}
