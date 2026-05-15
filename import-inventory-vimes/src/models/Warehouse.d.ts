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
export declare class Warehouse {
    readonly id: number | undefined;
    readonly warehouseCode: string | null;
    readonly warehouseName: string;
    readonly warehouseAddress: string | null;
    readonly createdAt: Date | null;
    readonly createdBy: number | null;
    readonly updatedAt: Date | null;
    readonly updatedBy: number | null;
    readonly isDeleted: boolean;
    constructor(init: WarehouseInit);
    static fromRow(row: Record<string, unknown>): Warehouse;
}
//# sourceMappingURL=Warehouse.d.ts.map