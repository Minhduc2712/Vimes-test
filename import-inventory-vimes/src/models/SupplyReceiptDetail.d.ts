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
export declare class SupplyReceiptDetail {
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
    constructor(init?: SupplyReceiptDetailInit);
    static fromRow(row: Record<string, unknown>): SupplyReceiptDetail;
    static initFromRow(row: Record<string, unknown>): SupplyReceiptDetailInit;
}
//# sourceMappingURL=SupplyReceiptDetail.d.ts.map