import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UtilsModule } from '../../shared/utils/utils.module';
import { DatePipe } from '@angular/common';

import { ApiService } from '../../shared/api/api.service';
import { WeatherOverviewComponent } from './weather-overview.component';
import { CityDetailsComponent } from '../city-details/city-details.component';
import { CityChartComponent } from '../city-chart/city-chart.component';
import { WeatherService } from '../weather.service';
import { CitySelectorComponent } from '../city-selector/city-selector.component';


describe('WeatherOverviewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherOverviewComponent,
        CitySelectorComponent,
        CityDetailsComponent,
        CityChartComponent
      ],
      imports: [
        UtilsModule,
        HttpModule
      ],
      providers: [
        ApiService,
        WeatherService,
        DatePipe
      ]
    }).compileComponents();
  }));

  // Testing WeatherOverviewComponent creation
  it('should create the WeatherOverviewComponent component', async(() => {
    const fixture = TestBed.createComponent(WeatherOverviewComponent);
    const weatherOverviewComponent = fixture.debugElement.componentInstance;
    expect(weatherOverviewComponent).toBeTruthy();
  }));
});
