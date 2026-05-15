export type SupplyReceiptDetailCreateInput = {
    itemId: number;
    docQuantity?: number | null;
    actualQuantity?: number | null;
    unitPrice?: number | null;
    totalPrice?: number | null;
};
export type SupplyReceiptCreateInput = {
    receiptCode: string | null;
    receiptNumber: string | null;
    entryDate: Date | string | null;
    organizationName?: string | null;
    departmentName?: string | null;
    debitAccount?: string | null;
    creditAccount?: string | null;
    delivererName?: string | null;
    sourceDocType?: string | null;
    sourceDocNo?: string | null;
    sourceDocDate?: string | null;
    sourceDocIssuer?: string | null;
    warehouseId?: number | null;
    attachedDocNote?: string | null;
    creatorName?: string | null;
    storekeeperName?: string | null;
    chiefAccountantName?: string | null;
    signedDate?: string | null;
    createdBy?: number | null;
    details?: SupplyReceiptDetailCreateInput[];
};
export type SupplyReceiptRow = {
    id: number;
    receipt_code: string;
    organization_name: string | null;
    department_name: string | null;
    entry_date: string;
    receipt_number: string;
    debit_account: string | null;
    credit_account: string | null;
    deliverer_name: string | null;
    source_doc_type: string | null;
    source_doc_no: string | null;
    source_doc_date: string | null;
    source_doc_issuer: string | null;
    warehouse_id: number | null;
    total_amount: string | number | null;
    attached_doc_note: string | null;
    creator_name: string | null;
    storekeeper_name: string | null;
    chief_accountant_name: string | null;
    signed_date: string | null;
    created_at: string;
    created_by: number | null;
    updated_at: string;
    updated_by: number | null;
    is_deleted: boolean;
};
export type SupplyReceiptDetailRow = {
    id: number;
    receipt_id: number;
    item_id: number;
    doc_quantity: string | number | null;
    actual_quantity: string | number | null;
    unit_price: string | number | null;
    total_price: string | number | null;
    created_at: string;
    created_by: number | null;
    updated_at: string;
    updated_by: number | null;
    is_deleted: boolean;
};
export type SupplyReceiptWithDetails = SupplyReceiptRow & {
    details: SupplyReceiptDetailRow[];
};
import type { SupplyReceipt } from '../models/SupplyReceipt.js';
export interface ISupplyReceiptRepository {
    list(): Promise<SupplyReceiptRow[]>;
    getById(id: number): Promise<SupplyReceiptWithDetails | null>;
    create(receipt: SupplyReceipt): Promise<SupplyReceiptWithDetails>;
}
export interface ISupplyReceiptService {
    list(): Promise<SupplyReceiptRow[]>;
    getById(id: number): Promise<SupplyReceiptWithDetails | null>;
    create(input: SupplyReceiptCreateInput): Promise<SupplyReceiptWithDetails>;
}
//# sourceMappingURL=supplyReceipt.d.ts.map