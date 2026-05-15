import type { IMedicalSupplyService, MedicalSupplyCreateInput, MedicalSupplyRow, MedicalSupplyUpdateInput } from '../interfaces/medicalSupply.js';
import type { IMedicalSupplyRepository } from '../interfaces/medicalSupply.js';
export declare class MedicalSupplyService implements IMedicalSupplyService {
    private readonly repository;
    constructor(repository: IMedicalSupplyRepository);
    list(): Promise<MedicalSupplyRow[]>;
    getById(id: number): Promise<MedicalSupplyRow | null>;
    create(input: MedicalSupplyCreateInput): Promise<MedicalSupplyRow>;
    update(id: number, input: MedicalSupplyUpdateInput): Promise<MedicalSupplyRow | null>;
    softDelete(id: number, updatedBy?: number | null): Promise<boolean>;
}
//# sourceMappingURL=medicalSupplyService.d.ts.map