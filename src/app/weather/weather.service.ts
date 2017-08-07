import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api/api.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class WeatherService {
  // Observables for our components to subscribe to.
  // They will come very handy when passing data between siblings
  citySelected$: Observable<any>;
  cityForecast$: Observable<any>;

  // Subjects to return data to subscribed components
  private citySelectedSubject = new Subject<any>();
  private cityForecastSubject = new Subject<any>();

  // API
  private apiUrl = 'http://api.openweathermap.org/data/2.5';
  private apiKey = '68d36dff9b1e6062e793cf2a5ffaa797';

  constructor(private apiService: ApiService) {
    this.citySelected$ = this.citySelectedSubject.asObservable();
    this.cityForecast$ = this.cityForecastSubject.asObservable();
  }

  // Returns a list of cities. Local fetch
  getCities(url: string) {
    return this.apiService.fetch(url);
  }

  // Returns current weather data for a given city. API call
  getCityCurrent(id: number) {
    const apiCompleteUrl = `${this.apiUrl}/weather?id=${id}&units=metric&appid=${this.apiKey}`;
    return this.apiService.fetch(apiCompleteUrl);
  }

  // Returns city forecast weather data. API call
  getCityForecast(id: number) {
    const apiCompleteUrl = `${this.apiUrl}/forecast?id=${id}&units=metric&appid=${this.apiKey}`;
    return this.apiService.fetch(apiCompleteUrl);
  }

  // Triggers subscribed components returns to them the current selected city passed as parameter
  citySelected(currentCity: any) {
    this.citySelectedSubject.next(currentCity);
  }

  // Returns to subscribed components the forecast data
  // We are passing this data in a shared service method in order to avoid making more than 1 call for a single city
  cityForecast(forecast: any) {
    this.cityForecastSubject.next(forecast);
  }
}
