import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// View components
import { LandingComponent } from './view/landing/landing.component';
import { WorldMapComponent } from './view/world-map/world-map.component';
import { AsiaPageComponent } from './view/asia-page/asia-page.component';
import { CountryListComponent } from './view/country-list/country-list.component';
import { QuizComponent } from './view/quiz/quiz.component';

// Shared components
import { CardComponent } from './component/card/card.component';
import { CountryPopupComponent } from './component/country-popup/country-popup.component';
import { CountryCardComponent } from './component/country-card/country-card.component';
import { CountryTableComponent } from './component/country-table/country-table.component';

@NgModule({
  declarations: [
    AppComponent,
    // Views
    LandingComponent,
    WorldMapComponent,
    AsiaPageComponent,
    CountryListComponent,
    QuizComponent,
    // Components
    CardComponent,
    CountryPopupComponent,
    CountryCardComponent,
    CountryTableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
