import { pool } from '../config/db.js';
export class SupplyReceiptRepository {
    async list() {
        const result = await pool.query('SELECT * FROM supply_receipts WHERE is_deleted = FALSE ORDER BY id DESC');
        return result.rows;
    }
    async getById(id) {
        const header = await pool.query('SELECT * FROM supply_receipts WHERE id = $1 AND is_deleted = FALSE', [id]);
        const headerRow = header.rows[0];
        if (!headerRow)
            return null;
        const details = await pool.query('SELECT * FROM supply_receipts_details WHERE receipt_id = $1 AND is_deleted = FALSE ORDER BY id', [id]);
        return {
            ...headerRow,
            details: details.rows
        };
    }
    async create(receipt) {
        if (!receipt.receiptCode) {
            throw new Error('Thiếu mã phiếu (receiptCode)');
        }
        if (!receipt.receiptNumber) {
            throw new Error('Thiếu số phiếu (receiptNumber)');
        }
        if (!receipt.entryDate) {
            throw new Error('Thiếu ngày nhập (entryDate)');
        }
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const insertedHeader = await client.query(`INSERT INTO supply_receipts (
                    receipt_code,
                    organization_name,
                    department_name,
                    entry_date,
                    receipt_number,
                    debit_account,
                    credit_account,
                    deliverer_name,
                    source_doc_type,
                    source_doc_no,
                    source_doc_date,
                    source_doc_issuer,
                    warehouse_id,
                    total_amount,
                    attached_doc_note,
                    creator_name,
                    storekeeper_name,
                    chief_accountant_name,
                    signed_date,
                    created_by,
                    updated_by
                ) VALUES (
                    $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$20
                )
                RETURNING *`, [
                receipt.receiptCode,
                receipt.organizationName ?? null,
                receipt.departmentName ?? null,
                receipt.entryDate,
                receipt.receiptNumber,
                receipt.debitAccount ?? null,
                receipt.creditAccount ?? null,
                receipt.delivererName ?? null,
                receipt.sourceDocType ?? null,
                receipt.sourceDocNo ?? null,
                receipt.sourceDocDate ?? null,
                receipt.sourceDocIssuer ?? null,
                receipt.warehouseId ?? null,
                receipt.totalAmount,
                receipt.attachedDocNote ?? null,
                receipt.creatorName ?? null,
                receipt.storekeeperName ?? null,
                receipt.chiefAccountantName ?? null,
                receipt.signedDate ?? null,
                receipt.createdBy ?? null
            ]);
            const headerRow = insertedHeader.rows[0];
            if (!headerRow) {
                throw new Error('Tạo phiếu nhập thất bại (không nhận được dữ liệu trả về)');
            }
            const receiptId = headerRow.id;
            const detailsInput = Array.isArray(receipt.details) ? receipt.details : [];
            let insertedDetails = [];
            if (detailsInput.length > 0) {
                const values = [];
                const placeholders = [];
                let counter = 1;
                for (const d of detailsInput) {
                    if (d.itemId == null) {
                        throw new Error('Chi tiết phiếu nhập thiếu itemId');
                    }
                    const totalPrice = d.totalPrice ?? 0;
                    const createdBy = receipt.createdBy ?? null;
                    placeholders.push(`($${counter++}, $${counter++}, $${counter++}, $${counter++}, $${counter++}, $${counter++}, $${counter++}, $${counter++})`);
                    values.push(receiptId, d.itemId, d.docQuantity ?? null, d.actualQuantity ?? null, d.unitPrice ?? null, totalPrice, createdBy, createdBy);
                }
                const insertedDetailsResult = await client.query(`INSERT INTO supply_receipts_details (
                        receipt_id,
                        item_id,
                        doc_quantity,
                        actual_quantity,
                        unit_price,
                        total_price,
                        created_by,
                        updated_by
                    ) VALUES ${placeholders.join(', ')}
                    RETURNING *`, values);
                insertedDetails = insertedDetailsResult.rows;
            }
            await client.query('COMMIT');
            return {
                ...headerRow,
                details: insertedDetails
            };
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
}
//# sourceMappingURL=supplyReceiptRepository.js.map