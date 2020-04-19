import {expect} from 'chai';
import {Given, Then, When} from 'cucumber';
import WeatherChecker from 'src/page-objects/weather-checker.po';

Given(/^I navigate to Weather Checker$/, function() {
    browser.url('/');
});
When(/^title displayed is "([^"]*)"$/, function(text: string) {
    expect(WeatherChecker.header.getText()).to.equal(text);
});
When(/^search button is present$/, function() {
    expect(WeatherChecker.button.search.isDisplayed()).to.be.true;
});
When(/^I search for "([^"]*)" postcode$/, function(postcode) {
    WeatherChecker.field.search.send(postcode);
    WeatherChecker.button.search.click();
});
Then(/^results table is present$/, function() {
    WeatherChecker.results.tableHeader.awaitVisibility();
});
Then(/^information for "([^"]*)" are present$/, function(values) {
    WeatherChecker.checkPresenceOfValues(values);
});
Then(/^timestamp is displayed in the format 'DD\/MM\/YYYY HH:mm:ss'$/, function() {
    expect(WeatherChecker.checkTimeFormat()).to.not.be.empty;
});
Then(/^none of the rows have empty values$/, function() {
    WeatherChecker.checkAgainstEmptyResults();
});
Then(/^error displays "([^"]*)"$/, function(text) {
    expect(WeatherChecker.error.getText()).to.contain(text);
});
