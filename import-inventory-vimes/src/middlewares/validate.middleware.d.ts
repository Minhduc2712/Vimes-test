import type { NextFunction, Request, Response } from 'express';
import { type ZodTypeAny } from 'zod';
export declare const validate: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.middleware.d.ts.map