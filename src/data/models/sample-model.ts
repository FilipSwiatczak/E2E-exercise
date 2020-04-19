/**
 * Models are essential to formalise your data structure to allow:
 *  - easy comparisons and validations
 *  - passing data models into functions and constructors (like a factory)
 *  - making your code easily readable
 *
 *  TIP: use auto generation for Getters and Setters (in Webstorm it's Alt + Insert -> Getter and Setter)
 */

import {Country} from "src/data/page-data/common.data";

export class SampleModel {
    private _name: string;
    private _surname: string;
    private _street: string;
    private _town: string;
    private _country: Country;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        this._surname = value;
    }

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }

    get town(): string {
        return this._town;
    }

    set town(value: string) {
        this._town = value;
    }

    get country(): Country {
        return this._country;
    }

    set country(value: Country) {
        this._country = value;
    }
}