import { Component, OnInit } from '@angular/core';
import {FuelServiceService} from "../fuel-service.service";

@Component({
  selector: 'app-view-stations',
  templateUrl: './view-stations.component.html',
  styleUrls: ['./view-stations.component.css']
})
export class ViewStationsComponent implements OnInit {
  stations = [];
  success = null;
  error= null;
  constructor(private fuelStationService: FuelServiceService) { }

  ngOnInit(): void {
    this.getStations();
  }

  getStations() {
    this.fuelStationService.getStations().subscribe((data: any[]) => {
      // console.log(data);
      this.stations = data;
      // console.log(this.stations);
      // adding another property to data object for edit
      this.stations.forEach(station => {
        station['isEdit'] = false;
      });
      console.log(this.stations);

    }, (err) => {
     console.log(err);
    });
  }


  closeEdit(station) {
    station.isEdit = false;
  }

  getStationById(station) {
    station.isEdit = true;
    console.log(station);
  }

  updateStation(station) {
    // console.log(station);
    const stationObj = {
      "fuel_price": station.fuel_price
    }
    console.log("my data");
    console.log(stationObj);
    this.fuelStationService.updateFuelPrice(station.id, stationObj).subscribe((data: any) => {
      console.log(data);
      this.success = 'Fuel Price has been updated';
      setTimeout(() => {
        this.success = null;
      }, 2000);
      station.isEdit = false;

    }, (err) => {
      console.log(err);
      this.error = err.error.message;
      setTimeout(() => {
       this.error = null
      },2000)
      station.isEdit = true;
    })
  }

  deleteStation(station) {
    console.log(station.id);
    this.fuelStationService.deleteStation(station.id).subscribe((data: any) => {
      console.log(data);
      const updatedStations = this.stations.filter((item) => item.id !== station.id);
      this.stations = updatedStations;
      this.success = 'Station has been deleted';
      setTimeout(() => {
        this.success = null;
      }, 2000);
      // console.log(updatedStations);
    }, (err) => {
      console.log(err);
    })
  }



}
