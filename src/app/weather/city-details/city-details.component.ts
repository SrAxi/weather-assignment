import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs/Rx';
import { City } from '../../shared/interfaces/city.model';

@Component({
  selector: 'city-details',
  templateUrl: './city-details.component.html'
})
export class CityDetailsComponent implements OnInit, OnDestroy {
  // Current city's forecast data
  cityForecast5days = <any>[];

  // Current selected city
  currentCity: City;

  // Error handler
  errorGettingForecast = {
    error: false,
    msg: ''
  };

  // City selection subscription.
  // Will come handy when the App will have some navigation and components will be destroyed and created again.
  private citySelectedSubscription: Subscription;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    // Triggers when a city is selected, will receive the city and get its data
    this.citySelectedSubscription = this.weatherService.citySelected$.subscribe(
      (selectedCity) => {
        // Checking if received clicked city is not the same as the previous one
        // This will avoid calling the API for the same city over and over
        if (selectedCity !== this.currentCity) {
          this.currentCity = selectedCity;
          // Gets city's forecast data
          this.weatherService.getCityForecast(selectedCity.id).subscribe(
            (cityForecast) => {
              // Mapping forecast data in order to filter data and obtain an array with 5 objects, one per day
              this.mapToGetFiveDays(cityForecast.list);

              // Triggering shared service method in order to send the forecast data to the Chart's component
              // (or any other subscribed component)
              this.weatherService.cityForecast(this.cityForecast5days);
            },
            (error) => {
              // filling error handler so error msg will be shown
              this.errorGettingForecast.error = true;
              this.errorGettingForecast.msg = error;
            }
          );
        }
      }
    );
  }

  // Mapping data in order to obtain a 5 days array
  mapToGetFiveDays(data: any[]) {
    // clearing array data to avoid days stacking when clicking several times
    this.cityForecast5days = [];

    data.forEach(
      (item) => {
        // Getting the date and making it readable for JS
        const dateTime = new Date(Date.parse(item.dt_txt));

        // A quick way is to choose an hour and split data in order to have 5 days
        // In a more complex App we would want to make an average of the temperature during all the hours of the day
        // and displaying that instead
        if (dateTime.getHours() === 12) {
          // filling our 5 days array with the forecast data for each day
          this.cityForecast5days.push(item);
        }
      }
    );
  }

  ngOnDestroy() {
    // Thinking big, when this App will have some navigation and components will destroy and recreate, we'll want to
    // unsubscribe to avoid memory leaks
    if (this.citySelectedSubscription) {
      this.citySelectedSubscription.unsubscribe();
    }
  }
}
