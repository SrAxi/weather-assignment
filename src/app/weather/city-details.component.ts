import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subscription } from 'rxjs/Rx';
import { City } from '../../assets/api/city.model';

@Component({
  selector: 'city-details',
  templateUrl: './city-details.component.html'
})
export class CityDetailsComponent implements OnInit, OnDestroy {
  cityForecast5days = <any>[];
  currentCity: City;

  private citySelectedSubscription: Subscription;

  constructor(private weatherService: WeatherService) {
    this.citySelectedSubscription = this.weatherService.citySelected$.subscribe(
      (selectedCity) => {
        this.currentCity = selectedCity;
        this.weatherService.getCityForecast(selectedCity.id).subscribe(
          (cityForecast) => {
            // Mapping forecast data in order to filter data and obtain an array with 5 objects, one per day
            this.mapToGetFiveDays(cityForecast.list);

            // Triggering shared service method in order to send the forecast data to the Chart's component
            this.weatherService.cityForecast(this.cityForecast5days);
          });
      }
    );
  }

  ngOnInit() {
  }

  mapToGetFiveDays(data: any[]) {
    this.cityForecast5days = [];
    data.map(
      (item) => {
        const dateTime = new Date(Date.parse(item.dt_txt));

        if (dateTime.getHours() === 12) {
          this.cityForecast5days.push(item);
        }
      }
    );

    console.log(this.cityForecast5days);
  }

  ngOnDestroy() {
    if (this.citySelectedSubscription) {
      this.citySelectedSubscription.unsubscribe();
    }
  }
}
