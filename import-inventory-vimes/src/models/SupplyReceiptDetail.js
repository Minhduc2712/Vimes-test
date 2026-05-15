const toDate = (value) => {
    if (value == null)
        return null;
    if (typeof value === 'string' && value.trim() === '')
        return null;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};
const toNumber = (value) => {
    if (value == null)
        return null;
    if (typeof value === 'string' && value.trim() === '')
        return null;
    const parsed = typeof value === 'number' ? value : Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
};
export class SupplyReceiptDetail {
    id;
    receiptId;
    itemId;
    docQuantity;
    actualQuantity;
    unitPrice;
    totalPrice;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    isDeleted;
    constructor(init = {}) {
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
    static fromRow(row) {
        return new SupplyReceiptDetail({
            id: row.id,
            receiptId: row.receipt_id ?? null,
            itemId: row.item_id ?? null,
            docQuantity: row.doc_quantity ?? null,
            actualQuantity: row.actual_quantity ?? null,
            unitPrice: row.unit_price ?? null,
            totalPrice: row.total_price ?? null,
            createdAt: row.created_at ?? null,
            createdBy: row.created_by ?? null,
            updatedAt: row.updated_at ?? null,
            updatedBy: row.updated_by ?? null,
            isDeleted: row.is_deleted ?? false
        });
    }
    static initFromRow(row) {
        return {
            id: row.id,
            receiptId: row.receipt_id ?? null,
            itemId: row.item_id ?? null,
            docQuantity: row.doc_quantity ?? null,
            actualQuantity: row.actual_quantity ?? null,
            unitPrice: row.unit_price ?? null,
            totalPrice: row.total_price ?? null,
            createdAt: row.created_at ?? null,
            createdBy: row.created_by ?? null,
            updatedAt: row.updated_at ?? null,
            updatedBy: row.updated_by ?? null,
            isDeleted: row.is_deleted ?? false
        };
    }
}
//# sourceMappingURL=SupplyReceiptDetail.js.map