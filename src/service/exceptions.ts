export class AuthRequiredError extends Error {
    constructor(message = "Login or create an Account to access this page") {
        super(message);
        this.name = "AuthRequiredError"
    }
}

export class DataIsUndefinedError extends Error {
    constructor(message = "Selected Data is Undefined") {
        super(message);
        this.name = "DataIsUndefinedError"
    }
}

export class AllCardsCollectedError extends Error {
    constructor(message = "You have collected All Cards Possible") {
        super(message);
        this.name = "AllCardsCollectedError"
    }
}