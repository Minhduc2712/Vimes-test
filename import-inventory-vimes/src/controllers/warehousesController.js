import { WarehouseRepository } from '../repositories/warehouseRepository.js';
import { WarehouseService } from '../services/warehouseService.js';
import { BadRequestError } from '../errors/httpErrors.js';
const service = new WarehouseService(new WarehouseRepository());
export const listWarehouses = async (req, res, next) => {
    try {
        const rows = await service.list();
        res.json(rows);
    }
    catch (error) {
        next(error);
    }
};
export const getWarehouseById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const row = await service.getById(id);
        if (!row) {
            res.status(404).json({ message: 'Không tìm thấy kho' });
            return;
        }
        res.json(row);
    }
    catch (error) {
        next(error);
    }
};
export const createWarehouse = async (req, res, next) => {
    try {
        const body = req.body;
        const row = await service.create(body);
        res.status(201).json(row);
    }
    catch (error) {
        next(error);
    }
};
export const updateWarehouse = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const body = req.body;
        const row = await service.update(id, body);
        if (!row) {
            res.status(404).json({ message: 'Không tìm thấy kho' });
            return;
        }
        res.json(row);
    }
    catch (error) {
        next(error);
    }
};
export const deleteWarehouse = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const updatedBy = req.body?.updatedBy;
        const ok = await service.softDelete(id, updatedBy);
        if (!ok) {
            res.status(404).json({ message: 'Không tìm thấy kho' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=warehousesController.js.map