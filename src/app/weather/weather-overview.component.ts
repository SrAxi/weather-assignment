import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { City } from '../../assets/api/city.model';
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
        this.cities = cities;
        this.currentCity = this.cities[0];

        console.log(JSON.stringify(cities));
      });

    this.citySelectedSubscription = this.weatherService.citySelected$.subscribe(
      (selectedCity) => {
        this.currentCity = selectedCity;
      }
    );
  }
}
