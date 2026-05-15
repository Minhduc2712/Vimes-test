import { z } from 'zod';
export declare const createMedicalSupplySchema: z.ZodObject<{
    body: z.ZodObject<{
        itemCode: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        itemName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        unit: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        createdBy: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateMedicalSupplySchema: z.ZodObject<{
    body: z.ZodObject<{
        itemCode: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        itemName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        unit: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        updatedBy: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
    }, z.core.$strict>;
}, z.core.$strip>;
//# sourceMappingURL=medicalSupply.validation.d.ts.map