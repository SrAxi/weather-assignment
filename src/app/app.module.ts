import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ApiService } from './shared/api/api.service';
import { WeatherModule } from './weather/weather.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    WeatherModule
  ],
  providers: [ ApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
