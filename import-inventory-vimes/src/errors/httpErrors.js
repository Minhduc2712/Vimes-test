export class HttpError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}
export class BadRequestError extends HttpError {
    constructor(message) {
        super(400, message);
    }
}
//# sourceMappingURL=httpErrors.js.map