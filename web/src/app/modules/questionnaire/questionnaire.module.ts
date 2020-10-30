import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QcmFormWhereBornComponent } from './components/qcm-form-where-born/qcm-form-where-born.component';
import { QcmFormWhenBornComponent } from './components/qcm-form-when-born/qcm-form-when-born.component';
import { QcmFormAdoptedComponent } from './components/qcm-form-adopted/qcm-form-adopted.component';
import { QcmFormArmedForceComponent } from './components/qcm-form-armed-force/qcm-form-armed-force.component';
import { QcmFormBritishNationalityComponent } from './components/qcm-form-british-nationality/qcm-form-british-nationality.component';
import { QcmFormLiveUkComponent } from './components/qcm-form-live-uk/qcm-form-live-uk.component';
import { QcmFormLeaveContryComponent } from './components/qcm-form-leave-contry/qcm-form-leave-contry.component';
import { QcmFormConclusionComponent } from './components/qcm-form-conclusion/qcm-form-conclusion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [QuestionnaireComponent, QcmFormWhereBornComponent,
                QcmFormWhenBornComponent, QcmFormAdoptedComponent,
                QcmFormArmedForceComponent, QcmFormBritishNationalityComponent,
                QcmFormLiveUkComponent, QcmFormLeaveContryComponent, QcmFormConclusionComponent],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionnaireModule { }
