import { z } from 'zod';
const toTrimmedStringOrUndefined = (value) => {
    if (value == null)
        return undefined;
    if (typeof value !== 'string')
        return undefined;
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
};
const requiredTrimmedString = (requiredMessage, emptyMessage) => z.preprocess((value) => {
    if (value == null)
        return undefined;
    if (typeof value !== 'string')
        return undefined;
    return value.trim();
}, z
    .string({ message: requiredMessage })
    .min(1, emptyMessage)
    .transform((s) => s.trim()));
const optionalTrimmedString = () => z.preprocess(toTrimmedStringOrUndefined, z.string().optional());
const optionalPositiveInt = (invalidMessage) => z.preprocess((v) => {
    if (v == null)
        return undefined;
    if (typeof v === 'number')
        return String(v);
    if (typeof v === 'string') {
        const trimmed = v.trim();
        return trimmed === '' ? undefined : trimmed;
    }
    return undefined;
}, z
    .string()
    .transform((s) => Number(s))
    .pipe(z.number().int(invalidMessage).positive(invalidMessage))
    .optional());
export const createWarehouseSchema = z.object({
    body: z
        .object({
        warehouseName: requiredTrimmedString('Tên kho (warehouseName) là bắt buộc', 'Tên kho không được để trống'),
        warehouseCode: optionalTrimmedString(),
        warehouseAddress: optionalTrimmedString(),
        createdBy: optionalPositiveInt('createdBy phải là số nguyên dương')
    })
        .strict()
});
export const updateWarehouseSchema = z.object({
    body: z
        .object({
        warehouseName: optionalTrimmedString(),
        warehouseCode: optionalTrimmedString(),
        warehouseAddress: optionalTrimmedString(),
        updatedBy: optionalPositiveInt('updatedBy phải là số nguyên dương')
    })
        .strict()
});
//# sourceMappingURL=warehouse.validation.js.map