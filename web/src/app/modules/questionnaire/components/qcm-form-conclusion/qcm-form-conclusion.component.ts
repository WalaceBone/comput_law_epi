import { Component, OnInit, Input } from '@angular/core';
import { QuestionnaireFormPayload } from 'src/app/models/questionnaire-form-model';
import { ApiService } from 'src/app/core/api/api.service';

@Component({
  selector: 'app-qcm-form-conclusion',
  templateUrl: './qcm-form-conclusion.component.html',
  styleUrls: ['./qcm-form-conclusion.component.scss']
})
export class QcmFormConclusionComponent implements OnInit {

  @Input() qcmPayload: QuestionnaireFormPayload;

  public reply: string;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.qcmPayload.bornBritishTerritory = true;
    const resp = await this.api.sendBritishCitizenshipTest(this.qcmPayload).subscribe(
      (response) => {
        this.reply = response.message;
      }, (error) => {
        this.reply = error;
      }
    );
  }

}
