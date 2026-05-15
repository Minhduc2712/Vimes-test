import {describe, it, expect, vi} from 'vitest';
import request from 'supertest';

vi.mock('../../src/repositories/supplyReceiptRepository.js', () => {
    return {
        SupplyReceiptRepository: class SupplyReceiptRepository {
            list = vi.fn();
            getById = vi.fn();
            create = vi.fn().mockResolvedValue({id: 101, details: []});
        }
    };
});

const loadApp = async () => {
    const {app} = await import('../../src/index.js');
    return app;
};

describe('Backend: Supply Receipt API', () => {
    it('POST /api/supply-receipts - Phải báo lỗi 400 nếu thiếu Số phiếu', async () => {
        const invalidData = {
            receiptCode: 'TEST01',
            receiptNumber: '',
            entryDate: '2026-05-15',
            details: [{itemId: 1, actualQuantity: 10, unitPrice: 5000}]
        };

        const app = await loadApp();
        const response = await request(app).post('/api/supply-receipts').send(invalidData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Dữ liệu không hợp lệ');
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'body.receiptNumber',
                    message: 'Số phiếu không được để trống'
                })
            ])
        );
    });

    it('POST /api/supply-receipts - Phải lưu thành công khi dữ liệu hợp lệ', async () => {
        const validData = {
            receiptCode: 'PNK_VIMES_01',
            receiptNumber: '001/VT',
            entryDate: '2026-05-15',
            details: [{itemId: 1, docQuantity: 10, actualQuantity: 10, unitPrice: 15000, totalPrice: 150000}]
        };

        const app = await loadApp();
        const response = await request(app).post('/api/supply-receipts').send(validData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});
