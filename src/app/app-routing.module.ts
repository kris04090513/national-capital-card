import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldMapComponent } from './view/world-map/world-map.component'

const routes: Routes = [
  { path: '', component: WorldMapComponent },
  // { path: 'continent/:name', component: CountryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
