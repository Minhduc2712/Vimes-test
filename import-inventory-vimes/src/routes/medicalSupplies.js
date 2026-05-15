import { Router } from 'express';
import { createMedicalSupply, deleteMedicalSupply, getMedicalSupplyById, listMedicalSupplies, updateMedicalSupply } from '../controllers/medicalSuppliesController.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createMedicalSupplySchema, updateMedicalSupplySchema } from '../validations/medicalSupply.validation.js';
export const medicalSuppliesRouter = Router();
medicalSuppliesRouter.get('/', listMedicalSupplies);
medicalSuppliesRouter.get('/:id', getMedicalSupplyById);
medicalSuppliesRouter.post('/', validate(createMedicalSupplySchema), createMedicalSupply);
medicalSuppliesRouter.put('/:id', validate(updateMedicalSupplySchema), updateMedicalSupply);
medicalSuppliesRouter.delete('/:id', deleteMedicalSupply);
//# sourceMappingURL=medicalSupplies.js.map