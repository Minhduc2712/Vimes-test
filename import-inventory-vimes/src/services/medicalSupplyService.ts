import type {IMedicalSupplyService, MedicalSupplyCreateInput, MedicalSupplyRow, MedicalSupplyUpdateInput} from '../interfaces/medicalSupply.js';
import type {IMedicalSupplyRepository} from '../interfaces/medicalSupply.js';

export class MedicalSupplyService implements IMedicalSupplyService {
    constructor(private readonly repository: IMedicalSupplyRepository) {}

    list(): Promise<MedicalSupplyRow[]> {
        return this.repository.list();
    }

    getById(id: number): Promise<MedicalSupplyRow | null> {
        return this.repository.getById(id);
    }

    create(input: MedicalSupplyCreateInput): Promise<MedicalSupplyRow> {
        return this.repository.create(input);
    }

    update(id: number, input: MedicalSupplyUpdateInput): Promise<MedicalSupplyRow | null> {
        return this.repository.update(id, input);
    }

    softDelete(id: number, updatedBy?: number | null): Promise<boolean> {
        return this.repository.softDelete(id, updatedBy);
    }
}
