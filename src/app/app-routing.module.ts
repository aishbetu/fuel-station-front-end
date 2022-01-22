import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddStationComponent} from "./add-station/add-station.component";
import {FindStationsComponent} from "./find-stations/find-stations.component";
import {ViewStationsComponent} from "./view-stations/view-stations.component";

const routes: Routes = [
  { path: '', component: FindStationsComponent },
  { path: 'add', component: AddStationComponent },
  { path: 'view', component: ViewStationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
