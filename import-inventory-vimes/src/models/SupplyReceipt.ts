export type SupplyReceiptInit = {
    id?: number;
    receiptCode?: string | null;
    receiptNumber?: string | null;
    organizationName?: string | null;
    departmentName?: string | null;
    entryDate?: Date | string | null;
    debitAccount?: string | null;
    creditAccount?: string | null;
    delivererName?: string | null;
    sourceDocType?: string | null;
    sourceDocNo?: string | null;
    sourceDocDate?: Date | string | null;
    sourceDocIssuer?: string | null;
    warehouseId?: number | null;
    totalAmount?: number | null;
    attachedDocNote?: string | null;
    creatorName?: string | null;
    storekeeperName?: string | null;
    chiefAccountantName?: string | null;
    signedDate?: Date | string | null;
    createdAt?: Date | string | null;
    createdBy?: number | null;
    updatedAt?: Date | string | null;
    updatedBy?: number | null;
    isDeleted?: boolean;

    details?: SupplyReceiptDetailInit[];
};

import {SupplyReceiptDetail, type SupplyReceiptDetailInit} from './SupplyReceiptDetail.js';

const toDate = (value: Date | string | null | undefined): Date | null => {
    if (value == null) return null;

    if (typeof value === 'string' && value.trim() === '') return null;

    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

export class SupplyReceipt {
    readonly id: number | undefined;
    readonly receiptCode: string | null;
    readonly receiptNumber: string | null;
    readonly organizationName: string | null;
    readonly departmentName: string | null;
    readonly entryDate: Date | null;
    readonly debitAccount: string | null;
    readonly creditAccount: string | null;
    readonly delivererName: string | null;
    readonly sourceDocType: string | null;
    readonly sourceDocNo: string | null;
    readonly sourceDocDate: Date | null;
    readonly sourceDocIssuer: string | null;
    readonly warehouseId: number | null;
    readonly attachedDocNote: string | null;
    readonly creatorName: string | null;
    readonly storekeeperName: string | null;
    readonly chiefAccountantName: string | null;
    readonly signedDate: Date | null;
    readonly createdAt: Date | null;
    readonly createdBy: number | null;
    readonly updatedAt: Date | null;
    readonly updatedBy: number | null;
    readonly isDeleted: boolean;

    readonly details: SupplyReceiptDetail[];
    readonly totalAmount: number; // Tổng tiền tự tính toán

    constructor(init: SupplyReceiptInit = {}) {
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

    static fromRow(row: Record<string, unknown>, detailRows: Record<string, unknown>[] = []): SupplyReceipt {
        const details = detailRows.map((dr) => SupplyReceiptDetail.initFromRow(dr));

        return new SupplyReceipt({
            id: row.id as number,
            receiptNumber: (row.receipt_number as string | null | undefined) ?? null,
            organizationName: (row.organization_name as string | null | undefined) ?? null,
            departmentName: (row.department_name as string | null | undefined) ?? null,
            entryDate: (row.entry_date as string | Date | null | undefined) ?? null,
            debitAccount: (row.debit_account as string | null | undefined) ?? null,
            creditAccount: (row.credit_account as string | null | undefined) ?? null,
            delivererName: (row.deliverer_name as string | null | undefined) ?? null,
            sourceDocType: (row.source_doc_type as string | null | undefined) ?? null,
            sourceDocNo: (row.source_doc_no as string | null | undefined) ?? null,
            sourceDocDate: (row.source_doc_date as string | Date | null | undefined) ?? null,
            sourceDocIssuer: (row.source_doc_issuer as string | null | undefined) ?? null,
            warehouseId: (row.warehouse_id as number | null | undefined) ?? null,
            totalAmount: row.total_amount == null ? null : Number(row.total_amount),
            attachedDocNote: (row.attached_doc_note as string | null | undefined) ?? null,
            creatorName: (row.creator_name as string | null | undefined) ?? null,
            storekeeperName: (row.storekeeper_name as string | null | undefined) ?? null,
            chiefAccountantName: (row.chief_accountant_name as string | null | undefined) ?? null,
            signedDate: (row.signed_date as string | Date | null | undefined) ?? null,
            createdAt: (row.created_at as string | Date | null | undefined) ?? null,
            createdBy: (row.created_by as number | null | undefined) ?? null,
            updatedAt: (row.updated_at as string | Date | null | undefined) ?? null,
            updatedBy: (row.updated_by as number | null | undefined) ?? null,
            isDeleted: (row.is_deleted as boolean | null | undefined) ?? false,
            details: details
        });
    }
}
