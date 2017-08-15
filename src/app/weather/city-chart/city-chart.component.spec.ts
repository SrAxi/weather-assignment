import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UtilsModule } from '../../shared/utils/utils.module';
import { DatePipe } from '@angular/common';

import { ApiService } from '../../shared/api/api.service';
import { WeatherOverviewComponent } from '../overview/weather-overview.component';
import { CityDetailsComponent } from '../city-details/city-details.component';
import { CityChartComponent } from './city-chart.component';
import { WeatherService } from '../weather.service';
import { CitySelectorComponent } from '../city-selector/city-selector.component';


describe('CityChartComponent', () => {
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

  // Testing CityChartComponent creation
  it('should create the CityChartComponent component', async(() => {
    const fixture = TestBed.createComponent(CityChartComponent);
    const cityChartComponent = fixture.debugElement.componentInstance;
    expect(cityChartComponent).toBeTruthy();
  }));
});
