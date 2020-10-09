import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [HomeComponent, PageNotFoundComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
