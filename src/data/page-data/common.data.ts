/**
 * Space to add any generic enum that are used for avoiding hard coding common values inside code.
 * It's also useful for filling in generic forms online and generating random data
 */

// For random value generation
export enum ContentType {
    Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    AlphaUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    Numeric = "0123456789",
    AlphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
}

export enum Title {
    Mr,
    Mrs,
    Miss,
    Ms,
    Dr,
    Other,
}

export enum Country {
    UnitedKingdom = "United Kingdom",
    UnitedStates = "United States",
    Etc = "exact spelling as required"
}