const toDate = (value) => {
    if (value == null)
        return null;
    return value instanceof Date ? value : new Date(value);
};
export class MedicalSupply {
    id;
    itemCode;
    itemName;
    unit;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    isDeleted;
    constructor(init = { itemCode: null }) {
        this.id = init.id;
        this.itemCode = init.itemCode ?? null;
        this.itemName = init.itemName ?? null;
        this.unit = init.unit ?? null;
        this.createdAt = toDate(init.createdAt);
        this.createdBy = init.createdBy ?? null;
        this.updatedAt = toDate(init.updatedAt);
        this.updatedBy = init.updatedBy ?? null;
        this.isDeleted = init.isDeleted ?? false;
    }
    static fromRow(row) {
        return new MedicalSupply({
            id: row.id,
            itemCode: row.item_code ?? null,
            itemName: row.item_name ?? null,
            unit: row.unit ?? null,
            createdAt: row.created_at ?? null,
            createdBy: row.created_by ?? null,
            updatedAt: row.updated_at ?? null,
            updatedBy: row.updated_by ?? null,
            isDeleted: row.is_deleted ?? false
        });
    }
}
//# sourceMappingURL=MedicalSupply.js.map