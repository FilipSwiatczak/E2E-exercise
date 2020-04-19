import {explicitTimeout, implicitTimeout} from 'src/data/timeouts';
import {IContainer, IOptionalParameters} from "src/web-elements/interfaces";

type LocatorFunction = () => WebdriverIO.Element;

export class Container implements IContainer {
    locator: LocatorFunction;
    private readonly parameters: IOptionalParameters;
    constructor(locator: LocatorFunction, parameters?: IOptionalParameters) {
        this.locator = locator;
        this.parameters = parameters ? parameters : {};
    }

    getText(): string {
        this.awaitVisibility();
        return this.locator().getText();
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