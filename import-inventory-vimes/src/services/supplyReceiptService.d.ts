import type { ISupplyReceiptService, SupplyReceiptCreateInput, SupplyReceiptRow, SupplyReceiptWithDetails } from '../interfaces/supplyReceipt.js';
import type { ISupplyReceiptRepository } from '../interfaces/supplyReceipt.js';
export declare class SupplyReceiptService implements ISupplyReceiptService {
    private readonly repository;
    constructor(repository: ISupplyReceiptRepository);
    list(): Promise<SupplyReceiptRow[]>;
    getById(id: number): Promise<SupplyReceiptWithDetails | null>;
    create(input: SupplyReceiptCreateInput): Promise<SupplyReceiptWithDetails>;
}
//# sourceMappingURL=supplyReceiptService.d.ts.map