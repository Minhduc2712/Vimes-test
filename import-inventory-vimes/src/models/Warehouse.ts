export type WarehouseInit = {
    id?: number;
    warehouseCode?: string | null;
    warehouseName: string;
    warehouseAddress?: string | null;
    createdAt?: Date | string | null;
    createdBy?: number | null;
    updatedAt?: Date | string | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
};

const toDate = (value: Date | string | null | undefined): Date | null => {
    if (value == null) return null;
    return value instanceof Date ? value : new Date(value);
};

export class Warehouse {
    readonly id: number | undefined;
    readonly warehouseCode: string | null;
    readonly warehouseName: string;
    readonly warehouseAddress: string | null;
    readonly createdAt: Date | null;
    readonly createdBy: number | null;
    readonly updatedAt: Date | null;
    readonly updatedBy: number | null;
    readonly isDeleted: boolean;

    constructor(init: WarehouseInit) {
        this.id = init.id;
        this.warehouseCode = init.warehouseCode ?? null;
        this.warehouseName = init.warehouseName;
        this.warehouseAddress = init.warehouseAddress ?? null;
        this.createdAt = toDate(init.createdAt);
        this.createdBy = init.createdBy ?? null;
        this.updatedAt = toDate(init.updatedAt);
        this.updatedBy = init.updatedBy ?? null;
        this.isDeleted = init.isDeleted ?? false;
    }

    static fromRow(row: Record<string, unknown>): Warehouse {
        return new Warehouse({
            id: row.id as number,
            warehouseCode: (row.warehouse_code as string | null | undefined) ?? null,
            warehouseName: row.warehouse_name as string,
            warehouseAddress: (row.warehouse_address as string | null | undefined) ?? null,
            createdAt: (row.created_at as string | Date | null | undefined) ?? null,
            createdBy: (row.created_by as number | null | undefined) ?? null,
            updatedAt: (row.updated_at as string | Date | null | undefined) ?? null,
            updatedBy: (row.updated_by as number | null | undefined) ?? null,
            isDeleted: (row.is_deleted as boolean | null | undefined) ?? false
        });
    }
}
