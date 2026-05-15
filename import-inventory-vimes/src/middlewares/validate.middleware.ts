import type {NextFunction, Request, Response} from 'express';
import {ZodError, type ZodTypeAny} from 'zod';

export const validate = (schema: ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const parsed = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            }) as {body?: unknown; query?: unknown; params?: unknown};

            if (parsed.body !== undefined) req.body = parsed.body;
            if (parsed.query !== undefined) req.query = parsed.query as any;
            if (parsed.params !== undefined) req.params = parsed.params as any;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }));
                res.status(400).json({message: 'Dữ liệu không hợp lệ', errors});
                return;
            }
            next(error);
        }
    };
};
