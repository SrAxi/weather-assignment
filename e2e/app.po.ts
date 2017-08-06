import { $$, browser, by, element } from 'protractor';

export class BackbaseWeatherCasePage {
  // Navigates to root
  navigateTo() {
    return browser.get('/');
  }

  // Gets the title of the website
  getTitle() {
    return element(by.css('app-root nav.navbar div.container a')).getText();
  }

  // Counts the rows within the cities table
  countRows() {
    return element(by.css('table.city-table tbody')).all(by.tagName('tr')).count();
  }

  // Gets the selected city from WeatherOverviewComponent
  getSelectedCity() {
    return element(by.css('weather-overview h1 > small')).getText();
  }

  // Gets the table row in the index position passed as parameter
  getTableOpt(opt: number) {
    const rows = $$('.city-table tbody tr');
    return rows.get(opt);
  }
}
