export type MedicalSupplyInit = {
    id?: number | undefined;
    itemCode?: string | null | undefined;
    itemName?: string | null | undefined;
    unit?: string | null | undefined;
    createdAt?: Date | string | null | undefined;
    createdBy?: number | null | undefined;
    updatedAt?: Date | string | null | undefined;
    updatedBy?: number | null | undefined;
    isDeleted?: boolean | undefined;
};
export declare class MedicalSupply {
    readonly id: number | undefined;
    readonly itemCode: string | null;
    readonly itemName: string | null;
    readonly unit: string | null;
    readonly createdAt: Date | null;
    readonly createdBy: number | null;
    readonly updatedAt: Date | null;
    readonly updatedBy: number | null;
    readonly isDeleted: boolean;
    constructor(init?: MedicalSupplyInit);
    static fromRow(row: Record<string, unknown>): MedicalSupply;
}
//# sourceMappingURL=MedicalSupply.d.ts.map