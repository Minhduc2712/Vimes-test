import {Router} from 'express';
import {createWarehouse, deleteWarehouse, getWarehouseById, listWarehouses, updateWarehouse} from '../controllers/warehousesController.js';
import {validate} from '../middlewares/validate.middleware.js';
import {createWarehouseSchema, updateWarehouseSchema} from '../validations/warehouse.validation.js';

export const warehousesRouter = Router();

warehousesRouter.get('/', listWarehouses);
warehousesRouter.get('/:id', getWarehouseById);
warehousesRouter.post('/', validate(createWarehouseSchema), createWarehouse);
warehousesRouter.put('/:id', validate(updateWarehouseSchema), updateWarehouse);
warehousesRouter.delete('/:id', validate(updateWarehouseSchema), deleteWarehouse);
