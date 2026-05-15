export type SupplyReceiptDetailInit = {
    id?: number;
    receiptId?: number | null;
    itemId?: number | null;
    docQuantity?: number | string | null;
    actualQuantity?: number | string | null;
    unitPrice?: number | string | null;
    totalPrice?: number | string | null;
    createdAt?: Date | string | null;
    createdBy?: number | null;
    updatedAt?: Date | string | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
};

const toDate = (value: Date | string | null | undefined): Date | null => {
    if (value == null) return null;

    if (typeof value === 'string' && value.trim() === '') return null;

    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

const toNumber = (value: number | string | null | undefined): number | null => {
    if (value == null) return null;

    if (typeof value === 'string' && value.trim() === '') return null;

    const parsed = typeof value === 'number' ? value : Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
};

export class SupplyReceiptDetail {
    readonly id: number | undefined;
    readonly receiptId: number | null;
    readonly itemId: number | null;
    readonly docQuantity: number | null;
    readonly actualQuantity: number | null;
    readonly unitPrice: number | null;
    readonly totalPrice: number | null;
    readonly createdAt: Date | null;
    readonly createdBy: number | null;
    readonly updatedAt: Date | null;
    readonly updatedBy: number | null;
    readonly isDeleted: boolean;

    constructor(init: SupplyReceiptDetailInit = {}) {
        this.id = init.id;
        this.receiptId = init.receiptId ?? null;
        this.itemId = init.itemId ?? null;
        this.docQuantity = toNumber(init.docQuantity);
        this.actualQuantity = toNumber(init.actualQuantity);
        this.unitPrice = toNumber(init.unitPrice);
        const parsedTotalPrice = toNumber(init.totalPrice);
        const effectiveQuantity = this.actualQuantity ?? this.docQuantity;
        this.totalPrice = parsedTotalPrice ?? (effectiveQuantity != null && this.unitPrice != null ? effectiveQuantity * this.unitPrice : null);
        this.createdAt = toDate(init.createdAt);
        this.createdBy = init.createdBy ?? null;
        this.updatedAt = toDate(init.updatedAt);
        this.updatedBy = init.updatedBy ?? null;
        this.isDeleted = init.isDeleted ?? false;
    }

    static fromRow(row: Record<string, unknown>): SupplyReceiptDetail {
        return new SupplyReceiptDetail({
            id: row.id as number,
            receiptId: (row.receipt_id as number | null | undefined) ?? null,
            itemId: (row.item_id as number | null | undefined) ?? null,
            docQuantity: (row.doc_quantity as number | string | null | undefined) ?? null,
            actualQuantity: (row.actual_quantity as number | string | null | undefined) ?? null,
            unitPrice: (row.unit_price as number | string | null | undefined) ?? null,
            totalPrice: (row.total_price as number | string | null | undefined) ?? null,
            createdAt: (row.created_at as string | Date | null | undefined) ?? null,
            createdBy: (row.created_by as number | null | undefined) ?? null,
            updatedAt: (row.updated_at as string | Date | null | undefined) ?? null,
            updatedBy: (row.updated_by as number | null | undefined) ?? null,
            isDeleted: (row.is_deleted as boolean | null | undefined) ?? false
        });
    }

    static initFromRow(row: Record<string, unknown>): SupplyReceiptDetailInit {
        return {
            id: row.id as number,
            receiptId: (row.receipt_id as number | null | undefined) ?? null,
            itemId: (row.item_id as number | null | undefined) ?? null,
            docQuantity: (row.doc_quantity as number | string | null | undefined) ?? null,
            actualQuantity: (row.actual_quantity as number | string | null | undefined) ?? null,
            unitPrice: (row.unit_price as number | string | null | undefined) ?? null,
            totalPrice: (row.total_price as number | string | null | undefined) ?? null,
            createdAt: (row.created_at as string | Date | null | undefined) ?? null,
            createdBy: (row.created_by as number | null | undefined) ?? null,
            updatedAt: (row.updated_at as string | Date | null | undefined) ?? null,
            updatedBy: (row.updated_by as number | null | undefined) ?? null,
            isDeleted: (row.is_deleted as boolean | null | undefined) ?? false
        };
    }
}
