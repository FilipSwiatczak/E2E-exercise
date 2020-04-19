import {After, Before, Status} from "cucumber";
import {implicitTimeout} from "src/data/timeouts";
import cucumberJson from "wdio-cucumberjs-json-reporter";
import {getLogger} from "src/lib/winston-logger"

const log = getLogger('hooks.steps');

Before({timeout: implicitTimeout.hooks}, function (scenario) {
    log.info('______________________________________________\n\n\nScenario START: '
    + scenario.pickle.name);
});
After({timeout: implicitTimeout.hooks}, function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        cucumberJson.attach(browser.takeScreenshot(), 'image/png');
    }
});
