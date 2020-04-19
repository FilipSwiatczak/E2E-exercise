import {explicitTimeout, implicitTimeout} from 'src/data/timeouts';
import {DropdownParameters, IContainer, IOptionalParameters} from "src/web-elements/interfaces";

type LocatorFunction = () => WebdriverIO.Element;

export class Dropdown implements IContainer {
    locator: LocatorFunction;
    private readonly dropParams: DropdownParameters;
    private readonly parameters: IOptionalParameters;

    constructor(locator: LocatorFunction, dropdownParameters?: DropdownParameters, parameters?: IOptionalParameters) {
        this.locator = locator;
        this.dropParams = dropdownParameters ? dropdownParameters : {};
        this.parameters = parameters ? parameters : {};
    }

    selectText(text: string, timeToWait: explicitTimeout | implicitTimeout = explicitTimeout.halfMinute) {
        if (this.parameters.waitBeforeStart) { browser.pause(this.parameters.waitBeforeStart); }
        if (this.dropParams.openerElement) {this.open(); }
        if (this.parameters.waitForVisible) {this.locator().waitForDisplayed(timeToWait); }
        this.locator().selectByVisibleText(text);
        if (this.parameters.waitAfterFinish) { browser.pause(this.parameters.waitAfterFinish); }
    }

    selectIndex(index: number, timeToWait: explicitTimeout | implicitTimeout = explicitTimeout.halfMinute) {
        if (this.parameters.waitBeforeStart) { browser.pause(this.parameters.waitBeforeStart); }
        if (this.dropParams.openerElement) {this.open(); }
        if (this.parameters.waitForVisible) {this.locator().waitForDisplayed(timeToWait); }
        this.locator().selectByIndex(index);
        if (this.parameters.waitAfterFinish) { browser.pause(this.parameters.waitAfterFinish); }
    }

    selectByAttribute(text: string, attribute: string = this.dropParams.attributeToSelectBy || 'value') {
        if (attribute) {
            if (this.parameters.waitBeforeStart) {
                browser.pause(this.parameters.waitBeforeStart);
            }
            if (this.dropParams.openerElement) {
                this.open();
            }
            if (this.parameters.waitForVisible) {this.locator().waitForDisplayed(implicitTimeout.defaultAction); }
            this.locator().selectByAttribute(attribute, text);
            if (this.parameters.waitAfterFinish) {
                browser.pause(this.parameters.waitAfterFinish);
            }
        }
    }

    open(timeToWait: explicitTimeout | implicitTimeout = implicitTimeout.defaultAction) {
        if (this.dropParams.openerElement) {
            this.dropParams.openerElement().waitForDisplayed(timeToWait);
            this.dropParams.openerElement().waitForEnabled(timeToWait);
            this.dropParams.openerElement().click();
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