import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { City } from '../../shared/interfaces/city.model';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'weather-overview',
  templateUrl: './weather-overview.component.html'
})
export class WeatherOverviewComponent implements OnInit {
  cities: Array<City>;
  currentCity: City;

  private citySelectedSubscription: Subscription;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getCities('../../assets/api/cities.json').subscribe(
      (cities) => {
        // We fill our cities array with the data retrieved
        this.cities = cities;

        // As a default, I have decided to select the first city of the array
        this.currentCity = this.cities[0];

        // We send the current selected city to the shared service
        this.weatherService.citySelected(this.currentCity);
      }
    );

    this.citySelectedSubscription = this.weatherService.citySelected$.subscribe(
      (selectedCity) => {
        this.currentCity = selectedCity;
      }
    );
  }
}
