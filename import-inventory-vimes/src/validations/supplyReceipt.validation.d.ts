import { z } from 'zod';
export declare const createSupplyReceiptSchema: z.ZodObject<{
    body: z.ZodObject<{
        receiptCode: z.ZodPreprocess<z.ZodString>;
        receiptNumber: z.ZodPreprocess<z.ZodString>;
        entryDate: z.ZodPreprocess<z.ZodString>;
        organizationName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        departmentName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        debitAccount: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        creditAccount: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        delivererName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        sourceDocType: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        sourceDocNo: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        sourceDocDate: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        sourceDocIssuer: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        warehouseId: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
        attachedDocNote: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        creatorName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        storekeeperName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        chiefAccountantName: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        signedDate: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        createdBy: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
        details: z.ZodArray<z.ZodObject<{
            itemId: z.ZodPreprocess<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
            docQuantity: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
            actualQuantity: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
            unitPrice: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
            totalPrice: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>>;
        }, z.core.$strip>>;
    }, z.core.$strict>;
}, z.core.$strip>;
//# sourceMappingURL=supplyReceipt.validation.d.ts.map