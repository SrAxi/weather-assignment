/*Core imports*/
import { NgModule } from '@angular/core';

/*Module imports*/
import { BrowserModule } from '@angular/platform-browser';
import { UtilsModule } from '../shared/utils/utils.module';

/*Service imports*/
import { WeatherService } from './weather.service';

/*Component imports*/
import { WeatherOverviewComponent } from './weather-overview.component';
import { CitySelectorComponent } from './city-selector.component';
import { CityDetailsComponent } from './city-details.component';

@NgModule({
  declarations: [
    WeatherOverviewComponent,
    CitySelectorComponent,
    CityDetailsComponent
  ],
  exports: [
    WeatherOverviewComponent
  ],
  imports: [
    BrowserModule,
    UtilsModule
  ],
  providers: [WeatherService],
})
export class WeatherModule {
}
