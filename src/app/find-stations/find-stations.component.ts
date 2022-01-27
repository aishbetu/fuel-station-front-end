import { Component, OnInit } from '@angular/core';
import {CoordinatesModel} from "./coordinates.model";
import {FuelServiceService} from "../fuel-service.service";

@Component({
  selector: 'app-find-stations',
  templateUrl: './find-stations.component.html',
  styleUrls: ['./find-stations.component.css']
})
export class FindStationsComponent implements OnInit {
  nearestStations = [];
  isSuccess = false;
  error = null;
  constructor(private fuelStationService: FuelServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(formData: CoordinatesModel){
    // console.log(formData);
    const x_coordinate = formData.x_coordinate;
    const y_coordinate = formData.y_coordinate;
    // y cord -> latitude & x cord -> longitude
    this.fuelStationService.getNearbyStations(y_coordinate, x_coordinate).subscribe((data: any) => {
      console.log("Success")
      console.log('JSON Response = ', data.data);
      this.nearestStations = data.data;
      this.isSuccess = true;
    }, (err) => {
      console.log('error occurred');
      console.log(err.error.message);
      this.error = err.error.message;
      setTimeout(() => {
        this.error = null;
      }, 3000);
    })
  }

}
