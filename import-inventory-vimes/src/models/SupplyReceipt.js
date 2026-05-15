import { SupplyReceiptDetail } from './SupplyReceiptDetail.js';
const toDate = (value) => {
    if (value == null)
        return null;
    if (typeof value === 'string' && value.trim() === '')
        return null;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};
export class SupplyReceipt {
    id;
    receiptCode;
    receiptNumber;
    organizationName;
    departmentName;
    entryDate;
    debitAccount;
    creditAccount;
    delivererName;
    sourceDocType;
    sourceDocNo;
    sourceDocDate;
    sourceDocIssuer;
    warehouseId;
    attachedDocNote;
    creatorName;
    storekeeperName;
    chiefAccountantName;
    signedDate;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    isDeleted;
    details;
    totalAmount; // Tổng tiền tự tính toán
    constructor(init = {}) {
        this.id = init.id;
        this.receiptCode = init.receiptCode ?? null;
        this.receiptNumber = init.receiptNumber ?? null;
        this.organizationName = init.organizationName ?? null;
        this.departmentName = init.departmentName ?? null;
        this.entryDate = toDate(init.entryDate);
        this.debitAccount = init.debitAccount ?? null;
        this.creditAccount = init.creditAccount ?? null;
        this.delivererName = init.delivererName ?? null;
        this.sourceDocType = init.sourceDocType ?? null;
        this.sourceDocNo = init.sourceDocNo ?? null;
        this.sourceDocDate = toDate(init.sourceDocDate);
        this.sourceDocIssuer = init.sourceDocIssuer ?? null;
        this.warehouseId = init.warehouseId ?? null;
        this.attachedDocNote = init.attachedDocNote ?? null;
        this.creatorName = init.creatorName ?? null;
        this.storekeeperName = init.storekeeperName ?? null;
        this.chiefAccountantName = init.chiefAccountantName ?? null;
        this.signedDate = toDate(init.signedDate);
        this.createdAt = toDate(init.createdAt);
        this.createdBy = init.createdBy ?? null;
        this.updatedAt = toDate(init.updatedAt);
        this.updatedBy = init.updatedBy ?? null;
        this.isDeleted = init.isDeleted ?? false;
        this.details = (init.details || []).map((detail) => new SupplyReceiptDetail(detail));
        this.totalAmount = init.totalAmount ?? this.details.reduce((sum, item) => sum + (item.totalPrice ?? 0), 0);
    }
    static fromRow(row, detailRows = []) {
        const details = detailRows.map((dr) => SupplyReceiptDetail.initFromRow(dr));
        return new SupplyReceipt({
            id: row.id,
            receiptNumber: row.receipt_number ?? null,
            organizationName: row.organization_name ?? null,
            departmentName: row.department_name ?? null,
            entryDate: row.entry_date ?? null,
            debitAccount: row.debit_account ?? null,
            creditAccount: row.credit_account ?? null,
            delivererName: row.deliverer_name ?? null,
            sourceDocType: row.source_doc_type ?? null,
            sourceDocNo: row.source_doc_no ?? null,
            sourceDocDate: row.source_doc_date ?? null,
            sourceDocIssuer: row.source_doc_issuer ?? null,
            warehouseId: row.warehouse_id ?? null,
            totalAmount: row.total_amount == null ? null : Number(row.total_amount),
            attachedDocNote: row.attached_doc_note ?? null,
            creatorName: row.creator_name ?? null,
            storekeeperName: row.storekeeper_name ?? null,
            chiefAccountantName: row.chief_accountant_name ?? null,
            signedDate: row.signed_date ?? null,
            createdAt: row.created_at ?? null,
            createdBy: row.created_by ?? null,
            updatedAt: row.updated_at ?? null,
            updatedBy: row.updated_by ?? null,
            isDeleted: row.is_deleted ?? false,
            details: details
        });
    }
}
//# sourceMappingURL=SupplyReceipt.js.map