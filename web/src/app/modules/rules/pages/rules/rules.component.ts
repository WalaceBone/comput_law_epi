import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  public reply: any;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    const resp = await this.api.getRules().subscribe(
      (response) => {
        this.reply = response;
      }, (error) => {
        this.reply = error;
      }
    );
  }

}
