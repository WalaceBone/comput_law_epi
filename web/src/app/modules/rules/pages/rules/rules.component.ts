import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  public reply: any;

  constructor(private api: ApiService, @Inject(DOCUMENT) private document: Document) { }

  async ngOnInit(): Promise<void> {
    const resp = await this.api.getRules().subscribe(
      (response) => {
        this.reply = response;
      }, (error) => {
        this.reply = error;
      }
    );
  }

  goToUrl(): void {
    this.document.location.href = 'https://www.legislation.gov.uk/ukpga/1981/61#reference-c20369871';
  }

}
