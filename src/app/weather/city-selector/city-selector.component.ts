import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather.service';
import { City } from '../../shared/interfaces/city.model';


@Component({
  selector: 'city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css']
})
export class CitySelectorComponent implements OnChanges {
  // Array of cities received from parent
  @Input() citiesList: Array<City>;

  // This will be the complete array of cities + current weather data
  citiesCompleteInfo = <any>[];

  // Error handler
  errorGettingCurrent = {
    error: false,
    msg: ''
  };

  constructor(private weatherService: WeatherService) {
  }

  // Triggers when we receive data from parent
  ngOnChanges(changes: SimpleChanges) {
    if (this.citiesList) {
      // We'll loop through the cities array in order to retrieve the current weather data for each one of them
      this.citiesList.forEach(
        (city) => {
          this.weatherService.getCityCurrent(city.id).subscribe(
            (cityCurrent) => {
              // set error handler to false again
              this.errorGettingCurrent.error = false;

              // Filling the cities array with all the needed data
              this.citiesCompleteInfo.push({...city, data: cityCurrent});
            },
            (error) => {
              // filling error handler so error msg will be shown
              this.errorGettingCurrent.error = true;
              this.errorGettingCurrent.msg = error;
            }
          );
        }
      );
    }
  }

  // method triggered by clicking the rows in the table, it will trigger several subscriptions in our shared service
  // This way we are sending the current selected city to the other components
  getCityDetails(currentCity: City) {
    this.weatherService.citySelected(currentCity);
  }
}
