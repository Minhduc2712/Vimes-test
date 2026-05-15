import type {ISupplyReceiptService, SupplyReceiptCreateInput, SupplyReceiptRow, SupplyReceiptWithDetails} from '../interfaces/supplyReceipt.js';
import type {ISupplyReceiptRepository} from '../interfaces/supplyReceipt.js';
import {SupplyReceipt} from '../models/SupplyReceipt.js';

export class SupplyReceiptService implements ISupplyReceiptService {
    constructor(private readonly repository: ISupplyReceiptRepository) {}

    list(): Promise<SupplyReceiptRow[]> {
        return this.repository.list();
    }

    getById(id: number): Promise<SupplyReceiptWithDetails | null> {
        return this.repository.getById(id);
    }

    async create(input: SupplyReceiptCreateInput): Promise<SupplyReceiptWithDetails> {
        const receiptModel = new SupplyReceipt(input);
        return this.repository.create(receiptModel);
    }
}
