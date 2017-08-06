import { BackbaseWeatherCasePage } from './app.po';
import { browser } from 'protractor';

describe('backbase-weather-case App', () => {
  let page: BackbaseWeatherCasePage;

  beforeEach(() => {
    page = new BackbaseWeatherCasePage();
  });

  it('should display App\'s title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Weather Master');
  });

  it('should show 5 cities', () => {
    expect(page.countRows()).toEqual(5);
  });

  it('should display `Amsterdam` as is the first element of the cities array and the default selected city',
    () => {
      expect(page.getSelectedCity()).toEqual('Amsterdam');
    });

  it('When clicking last city of the table should change the selected city',
    () => {
      const lastRow = page.getTableOpt(4);
      lastRow.click().then(function () {
        browser.waitForAngular();
        browser.sleep(1000).then(function () {
          expect(page.getSelectedCity()).not.toEqual('Amsterdam');
        });
      });
    });
});
