import type {NextFunction, Request, Response} from 'express';
import {MedicalSupplyRepository} from '../repositories/medicalSupplyRepository.js';
import {MedicalSupplyService} from '../services/medicalSupplyService.js';
import type {MedicalSupplyCreateInput, MedicalSupplyUpdateInput} from '../interfaces/medicalSupply.js';
import {BadRequestError} from '../errors/httpErrors.js';

const service = new MedicalSupplyService(new MedicalSupplyRepository());

export const listMedicalSupplies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rows = await service.list();
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

export const getMedicalSupplyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const row = await service.getById(id);
        if (!row) {
            res.status(404).json({message: 'Không tìm thấy vật tư'});
            return;
        }
        res.json(row);
    } catch (error) {
        next(error);
    }
};

export const createMedicalSupply = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as MedicalSupplyCreateInput;
        const row = await service.create(body);
        res.status(201).json(row);
    } catch (error) {
        next(error);
    }
};

export const updateMedicalSupply = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const body = req.body as MedicalSupplyUpdateInput;
        const row = await service.update(id, body);
        if (!row) {
            res.status(404).json({message: 'Không tìm thấy vật tư'});
            return;
        }
        res.json(row);
    } catch (error) {
        next(error);
    }
};

export const deleteMedicalSupply = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const updatedBy = (req.body as {updatedBy?: number | null} | undefined)?.updatedBy;
        const ok = await service.softDelete(id, updatedBy);
        if (!ok) {
            res.status(404).json({message: 'Không tìm thấy vật tư'});
            return;
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
