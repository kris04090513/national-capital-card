import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldMapComponent } from './view/world-map/world-map.component';
import { CountryListComponent } from './component/country-list/country-list.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { QuizComponent } from './component/quiz/quiz.component';
import { LandingComponent } from './view/landing/landing.component';

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
