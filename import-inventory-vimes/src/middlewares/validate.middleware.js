import { ZodError } from 'zod';
export const validate = (schema) => {
    return (req, res, next) => {
        try {
            const parsed = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            if (parsed.body !== undefined)
                req.body = parsed.body;
            if (parsed.query !== undefined)
                req.query = parsed.query;
            if (parsed.params !== undefined)
                req.params = parsed.params;
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }));
                res.status(400).json({ message: 'Dữ liệu không hợp lệ', errors });
                return;
            }
            next(error);
        }
    };
};
//# sourceMappingURL=validate.middleware.js.map