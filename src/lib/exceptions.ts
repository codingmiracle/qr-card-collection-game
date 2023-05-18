export class AuthRequiredError extends Error {
    constructor(message = "Login or create an Account to access this page") {
        super(message);
        this.name = "AuthRequiredError"
    }
}