export type MedicalSupplyCreateInput = {
    itemCode?: string | null;
    itemName?: string | null;
    unit?: string | null;
    createdBy?: number | null;
};

export type MedicalSupplyUpdateInput = {
    itemCode?: string | null;
    itemName?: string | null;
    unit?: string | null;
    updatedBy?: number | null;
};

export type MedicalSupplyRow = {
    id: number;
    item_code: string | null;
    item_name: string | null;
    unit: string | null;
    created_at: string;
    created_by: number | null;
    updated_at: string;
    updated_by: number | null;
    is_deleted: boolean;
};

export interface IMedicalSupplyRepository {
    list(): Promise<MedicalSupplyRow[]>;
    getById(id: number): Promise<MedicalSupplyRow | null>;
    create(input: MedicalSupplyCreateInput): Promise<MedicalSupplyRow>;
    update(id: number, input: MedicalSupplyUpdateInput): Promise<MedicalSupplyRow | null>;
    softDelete(id: number, updatedBy?: number | null): Promise<boolean>;
}

export interface IMedicalSupplyService {
    list(): Promise<MedicalSupplyRow[]>;
    getById(id: number): Promise<MedicalSupplyRow | null>;
    create(input: MedicalSupplyCreateInput): Promise<MedicalSupplyRow>;
    update(id: number, input: MedicalSupplyUpdateInput): Promise<MedicalSupplyRow | null>;
    softDelete(id: number, updatedBy?: number | null): Promise<boolean>;
}
