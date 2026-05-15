import { SupplyReceipt } from '../models/SupplyReceipt.js';
export class SupplyReceiptService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    list() {
        return this.repository.list();
    }
    getById(id) {
        return this.repository.getById(id);
    }
    async create(input) {
        const receiptModel = new SupplyReceipt(input);
        return this.repository.create(receiptModel);
    }
}
//# sourceMappingURL=supplyReceiptService.js.map