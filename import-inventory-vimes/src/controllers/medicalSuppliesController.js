import { MedicalSupplyRepository } from '../repositories/medicalSupplyRepository.js';
import { MedicalSupplyService } from '../services/medicalSupplyService.js';
import { BadRequestError } from '../errors/httpErrors.js';
const service = new MedicalSupplyService(new MedicalSupplyRepository());
export const listMedicalSupplies = async (req, res, next) => {
    try {
        const rows = await service.list();
        res.json(rows);
    }
    catch (error) {
        next(error);
    }
};
export const getMedicalSupplyById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const row = await service.getById(id);
        if (!row) {
            res.status(404).json({ message: 'Không tìm thấy vật tư' });
            return;
        }
        res.json(row);
    }
    catch (error) {
        next(error);
    }
};
export const createMedicalSupply = async (req, res, next) => {
    try {
        const body = req.body;
        const row = await service.create(body);
        res.status(201).json(row);
    }
    catch (error) {
        next(error);
    }
};
export const updateMedicalSupply = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const body = req.body;
        const row = await service.update(id, body);
        if (!row) {
            res.status(404).json({ message: 'Không tìm thấy vật tư' });
            return;
        }
        res.json(row);
    }
    catch (error) {
        next(error);
    }
};
export const deleteMedicalSupply = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const updatedBy = req.body?.updatedBy;
        const ok = await service.softDelete(id, updatedBy);
        if (!ok) {
            res.status(404).json({ message: 'Không tìm thấy vật tư' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=medicalSuppliesController.js.map