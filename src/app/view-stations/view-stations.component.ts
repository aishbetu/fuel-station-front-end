import { Component, OnInit } from '@angular/core';
import {FuelServiceService} from "../fuel-service.service";

@Component({
  selector: 'app-view-stations',
  templateUrl: './view-stations.component.html',
  styleUrls: ['./view-stations.component.css']
})
export class ViewStationsComponent implements OnInit {
  stations = [];
  isLoader = false;
  constructor(private fuelStationService: FuelServiceService) { }

  ngOnInit(): void {
    this.getStations();
  }

  getStations() {
    this.isLoader = false;
    this.fuelStationService.getStations().subscribe((data: any[]) => {
      // console.log(data);
      this.stations = data;
      // console.log(this.stations);
      this.stations.forEach(station => {
        station['isEdit'] = false;
      });
      console.log(this.stations);

      this.isLoader = false;

    }, (err) => {
      console.log("error hai kya?");
     this.isLoader = false;
     console.log(err);
    });
  }


  closeEdit(station) {
    station.isEdit = false;
  }

  getStationById(station) {
    station.isEdit = true;
    // call another method here
    console.log(station);
    // this.fuelStationService.updateFuelPrice(station.id)
  }

  updateStation(station) {
    station.isEdit = false;
    // console.log(station);
    const stationObj = {
      "fuel_price": station.fuel_price
    }
    console.log("my data")
    console.log(stationObj);
    this.fuelStationService.updateFuelPrice(station.id, stationObj).subscribe((data: any) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    })
  }

  deleteStation(station) {
    console.log(station.id);
    this.fuelStationService.deleteStation(station.id).subscribe((data: any) => {
      console.log(data);
      const updatedStations = this.stations.filter((item) => item.id !== station.id);
      this.stations = updatedStations;
      // console.log(updatedStations);
    }, (err) => {
      console.log(err);
    })
  }



}
