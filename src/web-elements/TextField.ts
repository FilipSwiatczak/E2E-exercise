import {explicitTimeout, implicitTimeout} from 'src/data/timeouts';
import {IContainer, IField, IOptionalParameters} from "src/web-elements/interfaces";

type LocatorFunction = () => WebdriverIO.Element;

export class TextField implements IField, IContainer {
    locator: LocatorFunction;
    private readonly parameters: IOptionalParameters;
    constructor(locator: LocatorFunction, parameters?: IOptionalParameters) {
        this.locator = locator;
        this.parameters = parameters ? parameters : {};
    }

    /**
     * Clears the input field, then sends entire string at once
     * @param text
     * @param timeToWait
     */
    send(text: string, timeToWait: explicitTimeout | implicitTimeout = explicitTimeout.halfMinute) {
        this.sendKeys(text, timeToWait)
    }

    /**
     * Sends entire string at once, does not clear the input field
     * @param text
     * @param timeToWait
     */
    sendAdd(text: string, timeToWait: explicitTimeout | implicitTimeout = explicitTimeout.halfMinute) {
        this.sendKeys(text, timeToWait)
    }

    /**
     * Sends string character by character, does not clear the field.
     * This is useful for components that change as you type, such as card details,
     * giving them time to correctly receive each key
     * @param text
     * @param timeToWait
     */
    sendCharByChar(text: string, timeToWait: explicitTimeout | implicitTimeout = explicitTimeout.halfMinute) {
        this.sendKeys(text, timeToWait)
    }

    private sendKeys(keys, timeToWait, add = false) {
        if (this.parameters.waitBeforeStart) {
            browser.pause(this.parameters.waitBeforeStart);
        }
        try {
            if (this.parameters.waitForVisible) {
                this.locator().waitForDisplayed(timeToWait);
                this.locator().waitForEnabled(timeToWait);
            }
            if(!add) { this.locator().setValue(keys); }
        } catch (e) {
            // second attempt
            try {
                this.locator().click();
            } catch (e) {
                throw new Error('Button caught an error: ' + e);
            }
        }
        if (this.parameters.waitAfterFinish) {
            browser.pause(this.parameters.waitAfterFinish);
        }
    }

    isDisplayed(): boolean {
        return this.locator().isDisplayed();
    }

    isExisting(): boolean  {
        return this.locator().isExisting();
    }

    awaitInvisibility(timeToWait: explicitTimeout | implicitTimeout = implicitTimeout.visibility) {
        if (this.locator().isExisting()){
            this.locator().waitForDisplayed(timeToWait, true);
        }
        if (this.parameters.waitAfterFinish) {
            browser.pause(this.parameters.waitAfterFinish);
        }
    }

    awaitVisibility(timeToWait: explicitTimeout | implicitTimeout = implicitTimeout.visibility) {
        this.locator().waitForDisplayed(timeToWait);
        if (this.parameters.waitAfterFinish) {
            browser.pause(this.parameters.waitAfterFinish);
        }
    }
}