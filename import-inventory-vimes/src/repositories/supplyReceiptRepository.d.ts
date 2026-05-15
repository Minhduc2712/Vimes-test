import type { ISupplyReceiptRepository, SupplyReceiptRow, SupplyReceiptWithDetails } from '../interfaces/supplyReceipt.js';
import type { SupplyReceipt } from '../models/SupplyReceipt.js';
export declare class SupplyReceiptRepository implements ISupplyReceiptRepository {
    list(): Promise<SupplyReceiptRow[]>;
    getById(id: number): Promise<SupplyReceiptWithDetails | null>;
    create(receipt: SupplyReceipt): Promise<SupplyReceiptWithDetails>;
}
//# sourceMappingURL=supplyReceiptRepository.d.ts.map