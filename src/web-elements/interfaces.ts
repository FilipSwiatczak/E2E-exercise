type LocatorFunction = () => WebdriverIO.Element;

export interface IOptionalParameters {
    waitForVisible?: boolean;
    waitForAnimation?: boolean;
    clearElement?: boolean;
    waitBeforeStart?: number;
    waitAfterFinish?: number;
}

export interface DropdownParameters {
    openerElement?: LocatorFunction;
    attributeToSelectBy?: string;
}

export interface IClickable {
    click(wait?: number);
}

export interface IField {
    send(text: string);
}

export interface IContainer {
    awaitVisibility();
    awaitInvisibility();
    isDisplayed();
    isExisting();
}

