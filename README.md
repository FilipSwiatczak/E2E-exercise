### WebdriverIO Baseline project with Cucumber

This project tests the sample Weather Checker react app from the UI E2E perspective

Install with `npm i`

Run `npm test` to run the test pack

#### About the solution:
 - **Page Object** pattern [showcase](src/page-objects/weather-checker.po.ts)
 - **Composition pattern** [showcase](src/web-elements) - wrapping common web elements like buttons, dropdowns and text fields for stable re-use and encapsulation
 - Cucumber WDIO config set up - [wdio.conf.js](config/wdio.conf.js)
 - **Cucumber reporter** by _Wim Selles_ [multiple-cucumber-html-reporter](https://www.npmjs.com/package/multiple-cucumber-html-reporter) all set up [here](src/lib/multipleCucumberReporter.js) 
 - **Winston** logger configured [here](src/lib/winston-logger.ts)
 - centralised and readable **wait time control** under [timeouts](src/data/timeouts.ts)

![alt text](https://cdn-images-1.medium.com/max/249/1*y_euvEopwrhPAT2meoPTkg@2x.png)