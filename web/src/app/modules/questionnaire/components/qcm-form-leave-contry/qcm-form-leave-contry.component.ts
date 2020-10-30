import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-qcm-form-leave-contry',
  templateUrl: './qcm-form-leave-contry.component.html',
  styleUrls: ['./qcm-form-leave-contry.component.scss']
})
export class QcmFormLeaveContryComponent implements OnInit {

  @Output() isLeaveContryEvent = new EventEmitter<boolean>();

  public reply: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  selected(event) {
    this.reply = event;
  }

  submit() {
    if (this.reply === undefined) {
      return;
    }
    this.isLeaveContryEvent.emit(this.reply);
  }

}
