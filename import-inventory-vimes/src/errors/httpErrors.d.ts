export declare class HttpError extends Error {
    readonly status: number;
    constructor(status: number, message: string);
}
export declare class BadRequestError extends HttpError {
    constructor(message: string);
}
//# sourceMappingURL=httpErrors.d.ts.map