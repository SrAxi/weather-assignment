Weather assignment
===================


Integration with [Open Weather Data API](https://openweathermap.org/api) in order to show current and forecast weather data of 5 european cities.

----------


Usage
-------------

Clone the repository

    git clone https://github.com/SrAxi/weather-assignment.git

Install dependencies using [npm](https://www.npmjs.com/)

    npm install
Run the App

    npm start

Run unit tests

    npm test

Run end-2-end tests

    ng e2e

Technologies
-------------

 - Angular 4.0
 - TypeScript 2.3
 - Angular-CLI 1.2.7
 - Bootstrap 4.0.0-alpha.6
 - Chart.js 2.6

About the project
-------------

 - Single page App separated in 3 main Components: City selector, City's forecast (5 days) and City's forecast chart.
 - Using [owfont](https://websygen.github.io/owfont/) for displaying weather icons.
 - Using [Chart.js](http://www.chartjs.org/) for the chart that displays Temperature, Humidity and Wind speed for the selected city.
 - Changes forecast data and chart's data when selecting a new city.

Future implementations or improvements
-------------

 - Add a control that checks that if user clicks a city that is already selected the App shouldn't do another API call.
 - Create a Component for error handling in the template, passing as parameters: context, error msg, etc.
 - Instead of filtering the forecast data by getting the results that match with the hour: 12:00, the system should calculate the average temperature, humidity and wind during all the hours of each day. This would allow to show the average temperature (for example) during the whole day instead of just the temperature at 12:00.
 - Add an option to view forecast hour in an interval of 3 hours when clicking on a forecast day.
 - Add min/max temperatures.
 - Add a search box with typeahead that finds any country available within OWD API.

