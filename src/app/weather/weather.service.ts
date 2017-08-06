import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api/api-service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class WeatherService {
  citySelected$: Observable<any>;

  private citySelectedSubject = new Subject<any>();
  private apiUrl = 'http://api.openweathermap.org/data/2.5';
  private apiKey = '68d36dff9b1e6062e793cf2a5ffaa797';

  constructor(private apiService: ApiService) {
    this.citySelected$ = this.citySelectedSubject.asObservable();
  }

  getCities(url: string) {
    return this.apiService.fetch(url);
  }

  getCityCurrent(id: number) {
    const apiCompleteUrl = `${this.apiUrl}/weather?id=${id}&units=metric&appid=${this.apiKey}`;
    return this.apiService.fetch(apiCompleteUrl);
  }

  getCityForecast(id: number) {
    const apiCompleteUrl = `${this.apiUrl}/forecast?id=${id}&units=metric&appid=${this.apiKey}`;
    return this.apiService.fetch(apiCompleteUrl);
  }

  citySelected(currentCity: any) {
    this.citySelectedSubject.next(currentCity);
  }
}
