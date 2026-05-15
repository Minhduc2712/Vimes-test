export class WarehouseService {
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
    create(input) {
        return this.repository.create(input);
    }
    update(id, input) {
        return this.repository.update(id, input);
    }
    softDelete(id, updatedBy) {
        return this.repository.softDelete(id, updatedBy);
    }
}
//# sourceMappingURL=warehouseService.js.map