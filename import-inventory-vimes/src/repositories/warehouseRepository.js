import { pool } from '../config/db.js';
export class WarehouseRepository {
    async list() {
        const result = await pool.query('SELECT * FROM warehouses WHERE is_deleted = FALSE ORDER BY id');
        return result.rows;
    }
    async getById(id) {
        const result = await pool.query('SELECT * FROM warehouses WHERE id = $1 AND is_deleted = FALSE', [id]);
        return result.rows[0] ?? null;
    }
    async create(input) {
        const result = await pool.query(`INSERT INTO warehouses (warehouse_code, warehouse_name, warehouse_address, created_by, updated_by)
             VALUES ($1, $2, $3, $4, $4)
             RETURNING *`, [input.warehouseCode ?? null, input.warehouseName, input.warehouseAddress ?? null, input.createdBy ?? null]);
        const row = result.rows[0];
        if (!row) {
            throw new Error('Tạo kho thất bại (không nhận được dữ liệu trả về)');
        }
        return row;
    }
    async update(id, input) {
        const result = await pool.query(`UPDATE warehouses
             SET warehouse_code = COALESCE($2, warehouse_code),
                 warehouse_name = COALESCE($3, warehouse_name),
                 warehouse_address = COALESCE($4, warehouse_address),
                 updated_at = CURRENT_TIMESTAMP,
                 updated_by = $5
             WHERE id = $1 AND is_deleted = FALSE
             RETURNING *`, [id, input.warehouseCode ?? null, input.warehouseName ?? null, input.warehouseAddress ?? null, input.updatedBy ?? null]);
        return result.rows[0] ?? null;
    }
    async softDelete(id, updatedBy) {
        const result = await pool.query(`UPDATE warehouses
             SET is_deleted = TRUE,
                 updated_at = CURRENT_TIMESTAMP,
                 updated_by = $2
             WHERE id = $1 AND is_deleted = FALSE
             RETURNING id`, [id, updatedBy ?? null]);
        return (result.rowCount ?? 0) > 0;
    }
}
//# sourceMappingURL=warehouseRepository.js.map