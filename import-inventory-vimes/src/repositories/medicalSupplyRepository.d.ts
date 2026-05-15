import type { IMedicalSupplyRepository, MedicalSupplyCreateInput, MedicalSupplyRow, MedicalSupplyUpdateInput } from '../interfaces/medicalSupply.js';
export declare class MedicalSupplyRepository implements IMedicalSupplyRepository {
    list(): Promise<MedicalSupplyRow[]>;
    getById(id: number): Promise<MedicalSupplyRow | null>;
    create(input: MedicalSupplyCreateInput): Promise<MedicalSupplyRow>;
    update(id: number, input: MedicalSupplyUpdateInput): Promise<MedicalSupplyRow | null>;
    softDelete(id: number, updatedBy?: number | null): Promise<boolean>;
}
//# sourceMappingURL=medicalSupplyRepository.d.ts.map