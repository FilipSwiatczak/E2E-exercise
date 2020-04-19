import {explicitTimeout, implicitTimeout} from 'src/data/timeouts';
import {IClickable, IContainer, IOptionalParameters} from "src/web-elements/interfaces";

type LocatorFunction = () => WebdriverIO.Element;

export class Button implements IClickable, IContainer {
    locator: LocatorFunction;
    private readonly parameters: IOptionalParameters;
    constructor(locator: LocatorFunction, parameters?: IOptionalParameters) {
        this.locator = locator;
        this.parameters = parameters ? parameters : {};
    }

    click(timeToWait: explicitTimeout | implicitTimeout = explicitTimeout.halfMinute) {
        if (this.parameters.waitBeforeStart) {
            browser.pause(this.parameters.waitBeforeStart);
        }
        try {
            if (this.parameters.waitForVisible) {
                this.locator().waitForDisplayed(timeToWait);
                this.locator().waitForEnabled(timeToWait);
            }
            this.locator().click();
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

    hover(timeToWait = explicitTimeout.halfMinute) {
        if (this.parameters.waitBeforeStart) {
            browser.pause(this.parameters.waitBeforeStart);
        }
        this.locator().waitForDisplayed(timeToWait);
        this.locator().moveTo();
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