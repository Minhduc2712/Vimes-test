import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../api/axiosClient', () => ({
    axiosClient: {
        post: vi.fn()
    }
}));

const loadModules = async () => {
    const [{CreateReceiptPage}, {axiosClient}] = await Promise.all([import('./CreateReceiptPage'), import('../api/axiosClient')]);
    return {CreateReceiptPage, axiosClient};
};

describe('CreateReceiptPage', () => {
    it('tự động tính thành tiền theo số lượng * đơn giá', async () => {
        const {CreateReceiptPage} = await loadModules();
        const {container} = render(<CreateReceiptPage />);

        const actualQuantity = container.querySelector<HTMLInputElement>('input[name="details.0.actualQuantity"]');
        const unitPrice = container.querySelector<HTMLInputElement>('input[name="details.0.unitPrice"]');
        const totalPrice = container.querySelector<HTMLInputElement>('input[name="details.0.totalPrice"]');

        expect(actualQuantity).toBeTruthy();
        expect(unitPrice).toBeTruthy();
        expect(totalPrice).toBeTruthy();

        fireEvent.change(actualQuantity!, {target: {value: '2'}});
        fireEvent.change(unitPrice!, {target: {value: '5'}});

        await waitFor(() => {
            expect(totalPrice!).toHaveValue(10);
        });

        // grandTotal > 0 => chuỗi dấu chấm
        expect(screen.getByText(/\.{10,}/)).toBeInTheDocument();
    });

    it('thiếu trường bắt buộc thì không gọi API', async () => {
        const user = userEvent.setup();
        const {CreateReceiptPage, axiosClient} = await loadModules();
        const postSpy = vi.mocked(axiosClient.post);
        postSpy.mockResolvedValue({id: 999} as never);

        render(<CreateReceiptPage />);

        await user.click(screen.getByRole('button', {name: /XÁC NHẬN LƯU PHIẾU/i}));

        await waitFor(() => {
            expect(screen.getByText(/Vui lòng nhập Số và Mã phiếu/i)).toBeInTheDocument();
        });

        expect(postSpy).not.toHaveBeenCalled();
    });

    it('submit hợp lệ sẽ gọi POST /supply-receipts', async () => {
        const user = userEvent.setup();
        const {CreateReceiptPage, axiosClient} = await loadModules();
        const postSpy = vi.mocked(axiosClient.post);
        postSpy.mockResolvedValue({id: 123} as never);

        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const {container} = render(<CreateReceiptPage />);

        await user.type(screen.getByPlaceholderText('Số phiếu'), 'PN001');
        await user.type(screen.getByPlaceholderText('Mã nội bộ'), 'RC001');

        const entryDate = container.querySelector<HTMLInputElement>('input[name="entryDate"]');
        expect(entryDate).toBeTruthy();
        await user.clear(entryDate!);
        await user.type(entryDate!, '2026-05-15');
        await waitFor(() => {
            expect(entryDate!.value).toBe('2026-05-15');
        });

        const itemId = container.querySelector<HTMLInputElement>('input[name="details.0.itemId"]');
        expect(itemId).toBeTruthy();
        await user.clear(itemId!);
        await user.type(itemId!, '1');
        await waitFor(() => {
            expect(itemId!.value).toBe('1');
        });

        const form = container.querySelector('form');
        expect(form).toBeTruthy();
        fireEvent.submit(form!);

        await waitFor(() => {
            expect(postSpy).toHaveBeenCalledTimes(1);
        });

        expect(postSpy).toHaveBeenCalledWith(
            '/supply-receipts',
            expect.objectContaining({
                receiptNumber: 'PN001',
                receiptCode: 'RC001'
            })
        );

        alertSpy.mockRestore();
    });
});
