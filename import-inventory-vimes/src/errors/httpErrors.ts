export class HttpError extends Error {
    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(400, message);
    }
}
