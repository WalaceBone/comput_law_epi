import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qcm-form-adopted',
  templateUrl: './qcm-form-adopted.component.html',
  styleUrls: ['./qcm-form-adopted.component.scss']
})
export class QcmFormAdoptedComponent implements OnInit {

  @Output() isAdoptedEvent = new EventEmitter<boolean>();

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
    this.isAdoptedEvent.emit(this.reply);
  }

}
