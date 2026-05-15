import { z } from 'zod';
export declare const createWarehouseSchema: z.ZodObject<{
    body: z.ZodObject<{
        warehouseName: z.ZodPreprocess<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
        warehouseCode: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        warehouseAddress: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        createdBy: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateWarehouseSchema: z.ZodObject<{
    body: z.ZodObject<{
        warehouseName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        warehouseCode: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        warehouseAddress: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        updatedBy: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
    }, z.core.$strict>;
}, z.core.$strip>;
//# sourceMappingURL=warehouse.validation.d.ts.map