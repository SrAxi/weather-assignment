import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs/Rx';
import { City } from '../../shared/interfaces/city.model';
import Chart from 'chart.js';

@Component({
  selector: 'city-chart',
  templateUrl: './city-chart.component.html'
})
export class CityChartComponent implements OnInit, OnDestroy {
  // Current selected city
  currentCity: City;

  // Chart instance property
  forecastChart;

  // Chart days display
  private days = <any>[];

  // DOM context for Chart
  private ctx = 'forecastChart';

  // Data to fill Chart with
  private chartData: any = {
    temp: [],
    hum: [],
    wind: []
  };

  // Chart's options parameter
  private options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Next 5 days'
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 10,
          suggestedMax: 20
        }
      }]
    },
    tooltips: {
      callbacks: {
        afterLabel: function (tooltipItem, data) {
          // Establishing which units will be used for each dataset
          const chartSymbols = ['ºC', '%', 'm/s'];

          // Adding to the tooltip the corresponding unit
          return `${tooltipItem.yLabel} ${chartSymbols[tooltipItem.datasetIndex]}`;
        }
      }
    }
  };

  // Subscriptions
  private citySelectedSubscription: Subscription;
  private cityForecastSubscription: Subscription;

  constructor(private weatherService: WeatherService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    // Triggers when a city is selected
    this.citySelectedSubscription = this.weatherService.citySelected$.subscribe(
      (selectedCity) => {
        this.currentCity = selectedCity;
      }
    );

    // Triggers when forecast data for current city is received in CityDetailsComponent
    this.cityForecastSubscription = this.weatherService.cityForecast$.subscribe(
      (forecast) => {
        // Clearing arrays so we don't stack data in the chart
        this.days = [];
        this.chartData.temp = [];
        this.chartData.hum = [];
        this.chartData.wind = [];

        // We map the forecast data and place the values in our properties so the Chart can reach them
        forecast.forEach(
          (day) => {
            // converting a readable date for JS to work with
            const dateTime = new Date(Date.parse(day.dt_txt));

            // We'll apply Angular's DatePipe in order to retrieve easily the days names
            const dayName = this.datePipe.transform(dateTime, 'EEEE');

            // Filling the days array with the new days
            this.days.push(dayName);

            // Filling the data needed for the Chart
            this.chartData.temp.push(Math.round(day.main.temp));
            this.chartData.hum.push(Math.round(day.main.humidity));
            this.chartData.wind.push(Math.round(day.wind.speed));
          }
        );

        // Rendering the Chart
        this.renderChart();
      }
    );
  }

  ngOnDestroy() {
    // Thinking big, when this App will have some navigation and components will destroy and recreate, we'll want to
    // unsubscribe to avoid memory leaks
    if (this.citySelectedSubscription) {
      this.citySelectedSubscription.unsubscribe();
    }
    if (this.cityForecastSubscription) {
      this.cityForecastSubscription.unsubscribe();
    }
  }

  // Rendering Chart method
  // It's very handy to create a method for the Chart rendering because this way we'll know when the data is available
  // and will be always able to instance the Chart when the data is there
  renderChart() {
    const config = {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          {
            label: `Temperature`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: this.chartData.temp,
            fill: false,
          },
          {
            label: `Humidty`,
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: this.chartData.hum,
          },
          {
            label: `Wind`,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            data: this.chartData.wind,
          }
        ]
      },
      options: this.options
    };

    // If the Chart has already been instanced we'll destroy it before instancing a new one
    if (this.forecastChart) {
      this.forecastChart.destroy();
    }
    // Instance Chart
    this.forecastChart = new Chart(this.ctx, config);
  }
}
