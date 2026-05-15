import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WarehouseService } from '../../src/services/warehouseService.js';
describe('Warehouse Service', () => {
    let repository;
    let service;
    const row = {
        id: 1,
        warehouse_code: 'K1',
        warehouse_name: 'Kho 1',
        warehouse_address: 'Hà Nội',
        created_at: '2026-05-15T00:00:00.000Z',
        created_by: 10,
        updated_at: '2026-05-15T00:00:00.000Z',
        updated_by: 10,
        is_deleted: false
    };
    beforeEach(() => {
        repository = {
            list: vi.fn(),
            getById: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            softDelete: vi.fn()
        };
        service = new WarehouseService(repository);
    });
    it('list() forward sang repository.list()', async () => {
        vi.mocked(repository.list).mockResolvedValue([row]);
        const result = await service.list();
        expect(repository.list).toHaveBeenCalledTimes(1);
        expect(result).toEqual([row]);
    });
    it('getById() forward sang repository.getById(id)', async () => {
        vi.mocked(repository.getById).mockResolvedValue(row);
        const result = await service.getById(123);
        expect(repository.getById).toHaveBeenCalledWith(123);
        expect(result).toEqual(row);
    });
    it('create() forward sang repository.create(input)', async () => {
        const input = {
            warehouseCode: 'K1',
            warehouseName: 'Kho 1',
            warehouseAddress: 'Hà Nội',
            createdBy: 10
        };
        vi.mocked(repository.create).mockResolvedValue(row);
        const result = await service.create(input);
        expect(repository.create).toHaveBeenCalledWith(input);
        expect(result).toEqual(row);
    });
    it('update() forward sang repository.update(id, input)', async () => {
        const input = {
            warehouseName: 'Kho 1 - sửa',
            updatedBy: 11
        };
        vi.mocked(repository.update).mockResolvedValue({ ...row, warehouse_name: 'Kho 1 - sửa', updated_by: 11 });
        const result = await service.update(1, input);
        expect(repository.update).toHaveBeenCalledWith(1, input);
        expect(result?.warehouse_name).toBe('Kho 1 - sửa');
        expect(result?.updated_by).toBe(11);
    });
    it('softDelete() forward sang repository.softDelete(id, updatedBy)', async () => {
        vi.mocked(repository.softDelete).mockResolvedValue(true);
        const result = await service.softDelete(5, 99);
        expect(repository.softDelete).toHaveBeenCalledWith(5, 99);
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=warehouse.service.test.js.map