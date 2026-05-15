const toDate = (value) => {
    if (value == null)
        return null;
    return value instanceof Date ? value : new Date(value);
};
export class Warehouse {
    id;
    warehouseCode;
    warehouseName;
    warehouseAddress;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    isDeleted;
    constructor(init) {
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
    static fromRow(row) {
        return new Warehouse({
            id: row.id,
            warehouseCode: row.warehouse_code ?? null,
            warehouseName: row.warehouse_name,
            warehouseAddress: row.warehouse_address ?? null,
            createdAt: row.created_at ?? null,
            createdBy: row.created_by ?? null,
            updatedAt: row.updated_at ?? null,
            updatedBy: row.updated_by ?? null,
            isDeleted: row.is_deleted ?? false
        });
    }
}
//# sourceMappingURL=Warehouse.js.map