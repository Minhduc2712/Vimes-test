import { SupplyReceiptRepository } from '../repositories/supplyReceiptRepository.js';
import { SupplyReceiptService } from '../services/supplyReceiptService.js';
import { BadRequestError } from '../errors/httpErrors.js';
const service = new SupplyReceiptService(new SupplyReceiptRepository());
export const listSupplyReceipts = async (req, res, next) => {
    try {
        const rows = await service.list();
        res.json(rows);
    }
    catch (error) {
        next(error);
    }
};
export const getSupplyReceiptById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            throw new BadRequestError('ID không hợp lệ');
        }
        const row = await service.getById(id);
        if (!row) {
            res.status(404).json({ message: 'Không tìm thấy phiếu nhập' });
            return;
        }
        res.json(row);
    }
    catch (error) {
        next(error);
    }
};
export const createSupplyReceipt = async (req, res, next) => {
    try {
        const body = req.body;
        const created = await service.create(body);
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=supplyReceiptsController.js.map