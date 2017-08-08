/*Core imports*/
import { NgModule } from '@angular/core';
/*Module imports*/
import { BrowserModule } from '@angular/platform-browser';
import { UtilsModule } from '../shared/utils/utils.module';
/*Service imports*/
import { WeatherService } from './weather.service';
import { DatePipe } from '@angular/common';
/*Component imports*/
import { WeatherOverviewComponent } from './weather-overview.component';
import { CitySelectorComponent } from './city-selector.component';
import { CityDetailsComponent } from './city-details.component';
import { CityChartComponent } from './city-chart.component';

@NgModule({
  declarations: [
    WeatherOverviewComponent,
    CitySelectorComponent,
    CityDetailsComponent,
    CityChartComponent
  ],
  exports: [
    WeatherOverviewComponent
  ],
  imports: [
    BrowserModule,
    UtilsModule
  ],
  providers: [WeatherService, DatePipe],
})
export class WeatherModule {
}
