import type {IWarehouseService, WarehouseCreateInput, WarehouseRow, WarehouseUpdateInput} from '../interfaces/warehouse.js';
import type {IWarehouseRepository} from '../interfaces/warehouse.js';

export class WarehouseService implements IWarehouseService {
    constructor(private readonly repository: IWarehouseRepository) {}

    list(): Promise<WarehouseRow[]> {
        return this.repository.list();
    }

    getById(id: number): Promise<WarehouseRow | null> {
        return this.repository.getById(id);
    }

    create(input: WarehouseCreateInput): Promise<WarehouseRow> {
        return this.repository.create(input);
    }

    update(id: number, input: WarehouseUpdateInput): Promise<WarehouseRow | null> {
        return this.repository.update(id, input);
    }

    softDelete(id: number, updatedBy?: number | null): Promise<boolean> {
        return this.repository.softDelete(id, updatedBy);
    }
}
