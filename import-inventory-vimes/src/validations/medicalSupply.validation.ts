import {z} from 'zod';

const toTrimmedStringOrUndefined = (value: unknown): string | undefined => {
    if (value == null) return undefined;
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
};

const optionalTrimmedString = () => z.preprocess(toTrimmedStringOrUndefined, z.string().optional());

const optionalPositiveInt = (invalidMessage: string) =>
    z.preprocess(
        (v) => {
            if (v == null) return undefined;
            if (typeof v === 'number') return String(v);
            if (typeof v === 'string') {
                const trimmed = v.trim();
                return trimmed === '' ? undefined : trimmed;
            }
            return undefined;
        },
        z
            .string()
            .transform((s) => Number(s))
            .pipe(z.number().int(invalidMessage).positive(invalidMessage))
            .optional()
    );

export const createMedicalSupplySchema = z.object({
    body: z
        .object({
            itemCode: optionalTrimmedString(),
            itemName: optionalTrimmedString(),
            unit: optionalTrimmedString(),
            createdBy: optionalPositiveInt('createdBy phải là số nguyên dương')
        })
        .strict()
});

export const updateMedicalSupplySchema = z.object({
    body: z
        .object({
            itemCode: optionalTrimmedString(),
            itemName: optionalTrimmedString(),
            unit: optionalTrimmedString(),
            updatedBy: optionalPositiveInt('updatedBy phải là số nguyên dương')
        })
        .strict()
});
