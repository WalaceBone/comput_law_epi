import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoiceComponent } from './pages/choice/choice.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'menu',
    component: ChoiceComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule { }
