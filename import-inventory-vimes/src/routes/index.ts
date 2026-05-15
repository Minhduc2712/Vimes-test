import {Router} from 'express';
import {warehousesRouter} from './warehouses.js';
import {medicalSuppliesRouter} from './medicalSupplies.js';
import {supplyReceiptsRouter} from './supplyReceipts.js';

export const apiRouter = Router();

apiRouter.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

apiRouter.use('/warehouses', warehousesRouter);
apiRouter.use('/medical-supplies', medicalSuppliesRouter);
apiRouter.use('/supply-receipts', supplyReceiptsRouter);
