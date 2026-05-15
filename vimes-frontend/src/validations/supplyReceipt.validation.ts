import {z} from 'zod';

const MISSING = '__MISSING__';

const toTrimmedStringOrMissing = (value: unknown): string => {
    if (value == null) return MISSING;
    if (typeof value !== 'string') return MISSING;
    return value.trim();
};

const toTrimmedStringOrUndefined = (value: unknown): string | undefined => {
    if (value == null) return undefined;
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
};

const requiredTrimmedString = (requiredMessage: string, emptyMessage: string) =>
    z.preprocess(
        toTrimmedStringOrMissing,
        z
            .string()
            .min(1, emptyMessage)
            .refine((s) => s !== MISSING, {message: requiredMessage})
    );

const requiredDateString = (requiredMessage: string, emptyMessage: string, formatMessage: string) =>
    z.preprocess(
        toTrimmedStringOrMissing,
        z
            .string()
            .min(1, emptyMessage)
            .regex(/^\d{4}-\d{2}-\d{2}$/, formatMessage)
            .refine((s) => s !== MISSING, {message: requiredMessage})
    );

const optionalTrimmedString = () => z.preprocess(toTrimmedStringOrUndefined, z.string().optional());

const optionalDateString = (formatMessage: string) =>
    z.preprocess(
        toTrimmedStringOrUndefined,
        z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, formatMessage)
            .optional()
    );

const requiredPositiveInt = (requiredMessage: string, invalidMessage: string) =>
    z.preprocess(
        (v) => {
            if (v == null) return '';
            if (typeof v === 'number') return Number.isNaN(v) ? '' : String(v);
            if (typeof v === 'string') return v.trim();
            return '';
        },
        z
            .string()
            .min(1, requiredMessage)
            .transform((s) => Number(s))
            .pipe(z.number().int(invalidMessage).positive(invalidMessage))
    );

const optionalPositiveInt = (invalidMessage: string) =>
    z.preprocess(
        (v) => {
            if (v == null) return undefined;
            if (typeof v === 'number') return Number.isNaN(v) ? undefined : String(v);
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

const optionalNonNegativeNumber = (message: string) =>
    z.preprocess(
        (v) => {
            if (v == null) return undefined;
            if (typeof v === 'number') return Number.isNaN(v) ? undefined : String(v);
            if (typeof v === 'string') {
                const trimmed = v.trim();
                return trimmed === '' ? undefined : trimmed;
            }
            return undefined;
        },
        z
            .string()
            .transform((s) => Number(s))
            .pipe(z.number().min(0, message))
            .optional()
    );

export const createSupplyReceiptSchema = z.object({
    body: z
        .object({
            receiptCode: requiredTrimmedString('Mã phiếu (receiptCode) là bắt buộc', 'Mã phiếu không được để trống'),
            receiptNumber: requiredTrimmedString('Số phiếu (receiptNumber) là bắt buộc', 'Số phiếu không được để trống'),
            entryDate: requiredDateString('Ngày nhập (entryDate) là bắt buộc', 'Ngày nhập không được để trống', 'Ngày nhập phải đúng định dạng YYYY-MM-DD'),

            organizationName: optionalTrimmedString(),
            departmentName: optionalTrimmedString(),
            debitAccount: optionalTrimmedString(),
            creditAccount: optionalTrimmedString(),
            delivererName: optionalTrimmedString(),
            sourceDocType: optionalTrimmedString(),
            sourceDocNo: optionalTrimmedString(),
            sourceDocDate: optionalDateString('Ngày chứng từ phải đúng định dạng YYYY-MM-DD'),
            sourceDocIssuer: optionalTrimmedString(),
            warehouseId: optionalPositiveInt('ID kho phải là số nguyên dương'),
            attachedDocNote: optionalTrimmedString(),
            creatorName: optionalTrimmedString(),
            storekeeperName: optionalTrimmedString(),
            chiefAccountantName: optionalTrimmedString(),
            signedDate: optionalDateString('Ngày ký phải đúng định dạng YYYY-MM-DD'),
            createdBy: optionalPositiveInt('createdBy phải là số nguyên dương'),

            details: z
                .array(
                    z.object({
                        itemId: requiredPositiveInt('Mã vật tư (itemId) là bắt buộc', 'Mã vật tư phải là số nguyên dương'),
                        docQuantity: optionalNonNegativeNumber('Số lượng chứng từ không được âm'),
                        actualQuantity: optionalNonNegativeNumber('Số lượng thực nhập không được âm'),
                        unitPrice: optionalNonNegativeNumber('Đơn giá không được âm'),
                        totalPrice: optionalNonNegativeNumber('Thành tiền không được âm')
                    })
                )
                .min(1, 'Phiếu nhập phải có ít nhất 1 chi tiết vật tư')
        })
        .strict()
});
