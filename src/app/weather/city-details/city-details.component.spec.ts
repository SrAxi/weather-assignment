import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UtilsModule } from '../../shared/utils/utils.module';
import { DatePipe } from '@angular/common';

import { ApiService } from '../../shared/api/api.service';
import { WeatherOverviewComponent } from '../overview/weather-overview.component';
import { CityDetailsComponent } from './city-details.component';
import { CityChartComponent } from '../city-chart/city-chart.component';
import { WeatherService } from '../weather.service';
import { CitySelectorComponent } from '../city-selector/city-selector.component';


describe('CityDetailsComponent', () => {
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

  // Testing CityDetailsComponent creation
  it('should create the CityDetailsComponent component', async(() => {
    const fixture = TestBed.createComponent(CityDetailsComponent);
    const cityDetailsComponent = fixture.debugElement.componentInstance;
    expect(cityDetailsComponent).toBeTruthy();
  }));
});
