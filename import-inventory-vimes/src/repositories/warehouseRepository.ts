import {pool} from '../config/db.js';
import type {IWarehouseRepository, WarehouseCreateInput, WarehouseRow, WarehouseUpdateInput} from '../interfaces/warehouse.js';

export class WarehouseRepository implements IWarehouseRepository {
    async list(): Promise<WarehouseRow[]> {
        const result = await pool.query<WarehouseRow>('SELECT * FROM warehouses WHERE is_deleted = FALSE ORDER BY id');
        return result.rows;
    }

    async getById(id: number): Promise<WarehouseRow | null> {
        const result = await pool.query<WarehouseRow>('SELECT * FROM warehouses WHERE id = $1 AND is_deleted = FALSE', [id]);
        return result.rows[0] ?? null;
    }

    async create(input: WarehouseCreateInput): Promise<WarehouseRow> {
        const result = await pool.query<WarehouseRow>(
            `INSERT INTO warehouses (warehouse_code, warehouse_name, warehouse_address, created_by, updated_by)
             VALUES ($1, $2, $3, $4, $4)
             RETURNING *`,
            [input.warehouseCode ?? null, input.warehouseName, input.warehouseAddress ?? null, input.createdBy ?? null]
        );

        const row = result.rows[0];
        if (!row) {
            throw new Error('Tạo kho thất bại (không nhận được dữ liệu trả về)');
        }

        return row;
    }

    async update(id: number, input: WarehouseUpdateInput): Promise<WarehouseRow | null> {
        const result = await pool.query<WarehouseRow>(
            `UPDATE warehouses
             SET warehouse_code = COALESCE($2, warehouse_code),
                 warehouse_name = COALESCE($3, warehouse_name),
                 warehouse_address = COALESCE($4, warehouse_address),
                 updated_at = CURRENT_TIMESTAMP,
                 updated_by = $5
             WHERE id = $1 AND is_deleted = FALSE
             RETURNING *`,
            [id, input.warehouseCode ?? null, input.warehouseName ?? null, input.warehouseAddress ?? null, input.updatedBy ?? null]
        );
        return result.rows[0] ?? null;
    }

    async softDelete(id: number, updatedBy?: number | null): Promise<boolean> {
        const result = await pool.query<{id: number}>(
            `UPDATE warehouses
             SET is_deleted = TRUE,
                 updated_at = CURRENT_TIMESTAMP,
                 updated_by = $2
             WHERE id = $1 AND is_deleted = FALSE
             RETURNING id`,
            [id, updatedBy ?? null]
        );

        return (result.rowCount ?? 0) > 0;
    }
}
