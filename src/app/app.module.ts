import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './component/card/card.component';
import { AsiaPageComponent } from './view/asia-page/asia-page.component';
import { WorldMapComponent } from './view/world-map/world-map.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AsiaPageComponent,
    WorldMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
