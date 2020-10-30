import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qcm-form-armed-force',
  templateUrl: './qcm-form-armed-force.component.html',
  styleUrls: ['./qcm-form-armed-force.component.scss']
})
export class QcmFormArmedForceComponent implements OnInit {

  @Output() isMemberArmedForceEvent = new EventEmitter<boolean>();

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
    this.isMemberArmedForceEvent.emit(this.reply);
  }

}
