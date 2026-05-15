import type { IWarehouseRepository, WarehouseCreateInput, WarehouseRow, WarehouseUpdateInput } from '../interfaces/warehouse.js';
export declare class WarehouseRepository implements IWarehouseRepository {
    list(): Promise<WarehouseRow[]>;
    getById(id: number): Promise<WarehouseRow | null>;
    create(input: WarehouseCreateInput): Promise<WarehouseRow>;
    update(id: number, input: WarehouseUpdateInput): Promise<WarehouseRow | null>;
    softDelete(id: number, updatedBy?: number | null): Promise<boolean>;
}
//# sourceMappingURL=warehouseRepository.d.ts.map