import type { IWarehouseService, WarehouseCreateInput, WarehouseRow, WarehouseUpdateInput } from '../interfaces/warehouse.js';
import type { IWarehouseRepository } from '../interfaces/warehouse.js';
export declare class WarehouseService implements IWarehouseService {
    private readonly repository;
    constructor(repository: IWarehouseRepository);
    list(): Promise<WarehouseRow[]>;
    getById(id: number): Promise<WarehouseRow | null>;
    create(input: WarehouseCreateInput): Promise<WarehouseRow>;
    update(id: number, input: WarehouseUpdateInput): Promise<WarehouseRow | null>;
    softDelete(id: number, updatedBy?: number | null): Promise<boolean>;
}
//# sourceMappingURL=warehouseService.d.ts.map