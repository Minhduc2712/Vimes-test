export type WarehouseCreateInput = {
    warehouseCode?: string | null;
    warehouseName: string;
    warehouseAddress?: string | null;
    createdBy?: number | null;
};
export type WarehouseUpdateInput = {
    warehouseCode?: string | null;
    warehouseName?: string | null;
    warehouseAddress?: string | null;
    updatedBy?: number | null;
};
export type WarehouseRow = {
    id: number;
    warehouse_code: string | null;
    warehouse_name: string;
    warehouse_address: string | null;
    created_at: string;
    created_by: number | null;
    updated_at: string;
    updated_by: number | null;
    is_deleted: boolean;
};
export interface IWarehouseRepository {
    list(): Promise<WarehouseRow[]>;
    getById(id: number): Promise<WarehouseRow | null>;
    create(input: WarehouseCreateInput): Promise<WarehouseRow>;
    update(id: number, input: WarehouseUpdateInput): Promise<WarehouseRow | null>;
    softDelete(id: number, updatedBy?: number | null): Promise<boolean>;
}
export interface IWarehouseService {
    list(): Promise<WarehouseRow[]>;
    getById(id: number): Promise<WarehouseRow | null>;
    create(input: WarehouseCreateInput): Promise<WarehouseRow>;
    update(id: number, input: WarehouseUpdateInput): Promise<WarehouseRow | null>;
    softDelete(id: number, updatedBy?: number | null): Promise<boolean>;
}
//# sourceMappingURL=warehouse.d.ts.map