import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { LandingComponent } from './view/landing/landing.component';
import { WorldMapComponent } from './view/world-map/world-map.component';
import { CountryListComponent } from './view/country-list/country-list.component';
import { QuizComponent } from './view/quiz/quiz.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'map', component: WorldMapComponent },
  { path: 'continent/:name', component: CountryListComponent },
  { path: 'quiz', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
