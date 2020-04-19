import {Button} from "src/web-elements/Button";
import {Container} from "src/web-elements/Container";
import {TextField} from "src/web-elements/TextField";

class WeatherCheckerPO {
    header = new Container(() => $('h2'), {waitForVisible: true});
    error = new Container(() => $('h1'));
    field = {
        search: new TextField(() => $('input[placeholder="Enter postcode"]')),
    };
    button = {
        search: new Button(() => $('form#searchLocation > button')),
    };
    results = {
        tableHeader: new Container(() => $('caption.tableHeader'), {waitForVisible: true}),
        time: new Container(() => $('table > tbody > tr:nth-child(1) > td')),
        // Normally I would implement a custom table Web Element (wrapper) but it's a bit of an overkill for this demo.
        // It would normally contain table validations in chained pattern (dot notation)
        // ex. table.selectColumn(name).validateContains(value);
        tableKeys: () => $$('table > tbody > tr > th'),
        tableValues: () => $$('table > tbody > tr > td'),
    };

    checkPresenceOfValues(values) {
        // multi assertion reporting works well with tuples
        const result = {
            pass: true,
            error: '',
        };
        let mandatoryKeys = values.split(', ');
        const keyArray = this.results.tableKeys();
        const valuesArray = this.results.tableValues();
        keyArray.forEach((element, index) => {
            const keyName = element.getText().replace(':', '');
            if (mandatoryKeys.findIndex((key) => keyName.includes(key)) !== -1) {
                // check if table value is non-empty
                if (valuesArray[index].getText().trim().length === 0) {
                    result.pass = false; result.error += 'Table key: "' + keyName + '" was empty \n';
                } else {
                    // passing check deletes entry, this way we only loop over the table once
                    mandatoryKeys = mandatoryKeys.filter((e) => e !== keyName);
                }
            }
        });
        if (mandatoryKeys.length > 0) {
            result.pass = false;
            result.error += 'These mandatory keys were not present in the table: ' + mandatoryKeys.toString();
        }
        if (!result.pass) {
            throw new Error('Table key validation failed: ' + result.error);
        }
    }

    checkAgainstEmptyResults() {
        const result = {
            pass: true,
            error: '',
        };
        const keyArray = this.results.tableKeys();
        const valuesArray = this.results.tableValues();
        valuesArray.forEach((element, index) => {
            // check if table value is non-empty
            if (valuesArray[index].getText().trim().length === 0) {
                const keyName = keyArray[index].getText();
                result.pass = false; result.error += '\nTable key: "' + keyName + '" was empty';
            }
        });
        if (!result.pass) {
            throw new Error('Table empty fields validation failed: ' + result.error);
        }
    }

    checkTimeFormat(): RegExpMatchArray {
        const timeValue = this.results.time.getText();
        return timeValue.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}/g);
    }
}

const WeatherChecker = new WeatherCheckerPO();
export default WeatherChecker;
