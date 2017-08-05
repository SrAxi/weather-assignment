import { BackbaseWeatherCasePage } from './app.po';

describe('backbase-weather-case App', () => {
  let page: BackbaseWeatherCasePage;

  beforeEach(() => {
    page = new BackbaseWeatherCasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
