export type MedicalSupplyInit = {
    id?: number | undefined;
    itemCode?: string | null | undefined;
    itemName?: string | null | undefined;
    unit?: string | null | undefined;
    createdAt?: Date | string | null | undefined;
    createdBy?: number | null | undefined;
    updatedAt?: Date | string | null | undefined;
    updatedBy?: number | null | undefined;
    isDeleted?: boolean | undefined;
};

const toDate = (value: Date | string | null | undefined): Date | null => {
    if (value == null) return null;
    return value instanceof Date ? value : new Date(value);
};

export class MedicalSupply {
    readonly id: number | undefined;
    readonly itemCode: string | null;
    readonly itemName: string | null;
    readonly unit: string | null;
    readonly createdAt: Date | null;
    readonly createdBy: number | null;
    readonly updatedAt: Date | null;
    readonly updatedBy: number | null;
    readonly isDeleted: boolean;

    constructor(init: MedicalSupplyInit = {itemCode: null}) {
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

    static fromRow(row: Record<string, unknown>): MedicalSupply {
        return new MedicalSupply({
            id: row.id as number,
            itemCode: (row.item_code as string | null | undefined) ?? null,
            itemName: (row.item_name as string | null | undefined) ?? null,
            unit: (row.unit as string | null | undefined) ?? null,
            createdAt: (row.created_at as string | Date | null | undefined) ?? null,
            createdBy: (row.created_by as number | null | undefined) ?? null,
            updatedAt: (row.updated_at as string | Date | null | undefined) ?? null,
            updatedBy: (row.updated_by as number | null | undefined) ?? null,
            isDeleted: (row.is_deleted as boolean | null | undefined) ?? false
        });
    }
}
