import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from './weather.service';
import { City } from '../../assets/api/city.model';


@Component({
  selector: 'city-selector',
  templateUrl: './city-selector.component.html'
})
export class CitySelectorComponent implements OnInit, OnChanges {
  @Input() citiesList: Array<City>;

  citiesCompleteInfo = <any>[];

  constructor(private weatherService: WeatherService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.citiesList) {
      this.citiesList.map(
        (city) => {
          this.weatherService.getCityCurrent(city.id).subscribe(
            (cityCurrent) => {
              this.citiesCompleteInfo.push({...city, data: cityCurrent});
            });
        }
      );
    }
  }

  ngOnInit() {
  }

  getCityDetails(currentCity: City) {
    this.weatherService.citySelected(currentCity);
  }
}
