### Weather Checker E2E testing exercise

This project tests the sample Weather Checker react app from the UI E2E perspective

Install with `npm i`

Run `npm run test` to run the test pack

Results report is generated under temporary folder `.tmp/report/index.html`

#### About the solution:
 - Results should contain 3 failures: the empty rows test, exact phrasing test on valid non-existing postcode and phrasing on non-valid postcode
 - CI approach is showcased with commentary in the sample [Jenkinsfile](Jenkinsfile) and contains parallelization, unit test and E2E test html reports and more
 - **Page Object** pattern [showcase](src/page-objects/weather-checker.po.ts)
 - **Composition pattern** [showcase](src/web-elements) - wrapping common web elements like buttons, dropdowns and text fields for stable re-use and encapsulation
 - Cucumber WDIO config set up - [wdio.conf.js](config/wdio.conf.js)
 - utilises **Cucumber reporter** by _Wim Selles_ [multiple-cucumber-html-reporter](https://www.npmjs.com/package/multiple-cucumber-html-reporter) configured [here](src/lib/multipleCucumberReporter.js) 
 - custom logging under **Winston** logger is configured [here](src/lib/winston-logger.ts)
 - centralised and readable **wait time control** under [timeouts](src/data/timeouts.ts)

#### Troubleshooting:
 **Non-windows disclosure**: efforts have been made to ensure pathing is system agnostic and all dependencies have no system specific issues. That said it has not been tested on a Mac/Linux

**Chromedriver**: dependency is configured to LATEST and configured in [.npmrc](.npmrc) to auto-detect system installed version. Should that fail, manually setting the chromedriver dependency in package.json to your system-installed chrome version should do the trick.

![alt text](https://cdn-images-1.medium.com/max/249/1*y_euvEopwrhPAT2meoPTkg@2x.png)