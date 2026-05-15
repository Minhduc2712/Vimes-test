import type {NextFunction, Request, Response} from 'express';
import {WarehouseRepository} from '../repositories/warehouseRepository.js';
import {WarehouseService} from '../services/warehouseService.js';
import type {WarehouseCreateInput, WarehouseUpdateInput} from '../interfaces/warehouse.js';
import {BadRequestError} from '../errors/httpErrors.js';

const service = new WarehouseService(new WarehouseRepository());

export const listWarehouses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rows = await service.list();
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

export const getWarehouseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const row = await service.getById(id);
        if (!row) {
            res.status(404).json({message: 'Không tìm thấy kho'});
            return;
        }
        res.json(row);
    } catch (error) {
        next(error);
    }
};

export const createWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as WarehouseCreateInput;
        const row = await service.create(body);
        res.status(201).json(row);
    } catch (error) {
        next(error);
    }
};

export const updateWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const body = req.body as WarehouseUpdateInput;
        const row = await service.update(id, body);
        if (!row) {
            res.status(404).json({message: 'Không tìm thấy kho'});
            return;
        }
        res.json(row);
    } catch (error) {
        next(error);
    }
};

export const deleteWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const updatedBy = (req.body as {updatedBy?: number | null} | undefined)?.updatedBy;
        const ok = await service.softDelete(id, updatedBy);
        if (!ok) {
            res.status(404).json({message: 'Không tìm thấy kho'});
            return;
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
