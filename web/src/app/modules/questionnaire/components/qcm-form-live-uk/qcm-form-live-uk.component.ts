import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qcm-form-live-uk',
  templateUrl: './qcm-form-live-uk.component.html',
  styleUrls: ['./qcm-form-live-uk.component.scss']
})
export class QcmFormLiveUkComponent implements OnInit {

  @Output() isLiveInUkEvent = new EventEmitter<boolean>();

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
    this.isLiveInUkEvent.emit(this.reply);
  }

}
