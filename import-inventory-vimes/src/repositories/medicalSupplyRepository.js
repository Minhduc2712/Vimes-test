import { pool } from '../config/db.js';
export class MedicalSupplyRepository {
    async list() {
        const result = await pool.query('SELECT * FROM medical_supplies WHERE is_deleted = FALSE ORDER BY id');
        return result.rows;
    }
    async getById(id) {
        const result = await pool.query('SELECT * FROM medical_supplies WHERE id = $1 AND is_deleted = FALSE', [id]);
        return result.rows[0] ?? null;
    }
    async create(input) {
        const result = await pool.query(`INSERT INTO medical_supplies (item_code, item_name, unit, created_by, updated_by)
             VALUES ($1, $2, $3, $4, $4)
             RETURNING *`, [input.itemCode ?? null, input.itemName ?? null, input.unit ?? null, input.createdBy ?? null]);
        const row = result.rows[0];
        if (!row) {
            throw new Error('Tạo vật tư thất bại (không nhận được dữ liệu trả về)');
        }
        return row;
    }
    async update(id, input) {
        const result = await pool.query(`UPDATE medical_supplies
             SET item_code = COALESCE($2, item_code),
                 item_name = COALESCE($3, item_name),
                 unit = COALESCE($4, unit),
                 updated_at = CURRENT_TIMESTAMP,
                 updated_by = $5
             WHERE id = $1 AND is_deleted = FALSE
             RETURNING *`, [id, input.itemCode ?? null, input.itemName ?? null, input.unit ?? null, input.updatedBy ?? null]);
        return result.rows[0] ?? null;
    }
    async softDelete(id, updatedBy) {
        const result = await pool.query(`UPDATE medical_supplies
             SET is_deleted = TRUE,
                 updated_at = CURRENT_TIMESTAMP,
                 updated_by = $2
             WHERE id = $1 AND is_deleted = FALSE
             RETURNING id`, [id, updatedBy ?? null]);
        return (result.rowCount ?? 0) > 0;
    }
}
//# sourceMappingURL=medicalSupplyRepository.js.map