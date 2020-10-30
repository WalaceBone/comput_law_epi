import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { QuestionnaireFormPayload } from 'src/app/models/questionnaire-form-model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  public addQuestionnairePayload: QuestionnaireFormPayload;
  public step: number;

  constructor(private api: ApiService) {
    this.step = 0;
    this.addQuestionnairePayload = {} as QuestionnaireFormPayload;
  }

  ngOnInit(): void {
  }

}
