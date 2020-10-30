import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';

@Component({
  selector: 'app-qcm-form-where-born',
  templateUrl: './qcm-form-where-born.component.html',
  styleUrls: ['./qcm-form-where-born.component.scss']
})
export class QcmFormWhereBornComponent implements OnInit {

  @Output() whereBornEvent = new EventEmitter<string>();

  public eligibleTerritoryList: string[];
  public selectedTerritory: string;

  constructor(private api: ApiService) {
    this.selectedTerritory = 'United Kingdom';
  }

  ngOnInit(): void {
    this.api.getTerritoryList().subscribe(res => {
      this.eligibleTerritoryList = res.territory;
    });
  }

  public onChange(item: string) {
    this.selectedTerritory = item;
  }

  submit() {
    this.whereBornEvent.emit('undefined');
  }

}
