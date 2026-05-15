import { Router } from 'express';
import { createSupplyReceipt, getSupplyReceiptById, listSupplyReceipts } from '../controllers/supplyReceiptsController.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createSupplyReceiptSchema } from '../validations/supplyReceipt.validation.js';
export const supplyReceiptsRouter = Router();
supplyReceiptsRouter.get('/', listSupplyReceipts);
supplyReceiptsRouter.get('/:id', getSupplyReceiptById);
supplyReceiptsRouter.post('/', validate(createSupplyReceiptSchema), createSupplyReceipt);
//# sourceMappingURL=supplyReceipts.js.map