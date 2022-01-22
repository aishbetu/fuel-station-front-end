import {Component, OnInit, ViewChild} from '@angular/core';
import {StationModel} from "../station.model";
import {FuelServiceService} from "../fuel-service.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent implements OnInit {
  @ViewChild('stationForm', {static: false}) stationForm: NgForm;
  error = null;
  success = null;
  constructor(private fuelStationService: FuelServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(formData: StationModel) {
    console.log(formData);
    this.fuelStationService.addStation(formData.station_name, formData.x_coordinate, formData.y_coordinate, formData.fuel_price).subscribe((data: any) => {
      console.log("Success")
      console.log('JSON Response = ', data);
      this.success = 'Station has been added successfully'
      this.stationForm.reset();
    }, err => {
      console.log('error occurred');
      console.log(err.error.message);
      this.error = err.error.message;
      this.stationForm.reset();
    });

  }

}
