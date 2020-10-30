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

  whereBorn(item: string) {
    console.log('where born receive : [' + item + ']');
    this.addQuestionnairePayload.bornPlace = item;
    this.step++;
  }

  whenBorn(item: string) {
    console.log('when born receive : [' + item + ']');
    this.addQuestionnairePayload.birthDate = item;
    this.step++;
  }

  isAdopted(item: boolean) {
    console.log('is adopted receive : [' + item + ']');
    this.addQuestionnairePayload.isAdopt = item;
    this.step++;
  }

  isBritish(item: boolean) {
    console.log('is parent have birtish nationality : [' + item + ']');
    this.addQuestionnairePayload.isParentBritishNationality = item;
    this.step++;
  }

  isLiveInUk(item: boolean) {
    console.log('is parent live in british territory : [' + item + ']');
    this.addQuestionnairePayload.isParentLiveBritishTerritory = item;
    this.step++;
  }

  isMemberArmedForce(item: boolean) {
    console.log('is parent member of armed force : [' + item + ']');
    this.addQuestionnairePayload.isParentMemberArmedForces = item;
    this.step++;
  }

}
