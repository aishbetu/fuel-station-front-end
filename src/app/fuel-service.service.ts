import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StationModel} from "./station.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FuelServiceService {

  constructor(private http: HttpClient) { }

  getStations(){
    return this.http.get('http://localhost:5000/api/v1/stations');
  }

  addStation(station_name: string, x_coordinate: number, y_coordinate: number, fuel_price: number){
    const postStationData: StationModel = {station_name: station_name, x_coordinate: x_coordinate, y_coordinate: y_coordinate, fuel_price: fuel_price}
    return this.http.post('http://localhost:5000/api/v1/stations', postStationData).pipe(
      map(
        (data) => {
          return data;
        },
        (err) => {
          throw err;
        }
      )
    );
  }

  getNearbyStations(y_coordinate, x_coordinate){
    // y cord -> latitude & x cord -> longitude
    return this.http.get(`http://localhost:5000/api/v1/stations/find/${y_coordinate}/${x_coordinate}`).pipe(
      map(
        (data) => {
          return data;
        },
        (err) => {
          throw err;
        }
      )
    );
  }

  updateFuelPrice(id: number, stationObj) {
    return this.http.put(`http://localhost:5000/api/v1/stations/${id}`, stationObj).pipe(
      map(
        (data) => {
          return data;
        },
        (err) => {
          throw err;
        }
      )
    );
  }

  deleteStation(id: number) {
    return this.http.delete(`http://localhost:5000/api/v1/stations/${id}`).pipe(
      map(
        (data) => {
          return data;
        },
        (err) => {
          throw err;
        }
      )
    );
  }

}
