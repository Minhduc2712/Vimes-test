import React, {useEffect} from 'react';
import {useForm, useFieldArray, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createSupplyReceiptSchema} from '../validations/supplyReceipt.validation';
import {axiosClient} from '../api/axiosClient';
import {z} from 'zod';

type ReceiptFormValues = z.infer<typeof createSupplyReceiptSchema>['body'];

export const CreateReceiptPage = () => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: {errors, isSubmitting}
    } = useForm<ReceiptFormValues>({
        resolver: zodResolver(createSupplyReceiptSchema.shape.body) as any,
        defaultValues: {
            receiptCode: '', // Khởi tạo giá trị trống cho receiptCode
            receiptNumber: '',
            details: [{itemId: 1, docQuantity: 0, actualQuantity: 0, unitPrice: 0, totalPrice: 0}]
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'details'
    });

    const watchDetails = useWatch({control, name: 'details'});

    useEffect(() => {
        if (watchDetails) {
            watchDetails.forEach((item, index) => {
                const quantity = item?.actualQuantity || 0;
                const price = item?.unitPrice || 0;
                const calculatedTotal = quantity * price;

                if (item?.totalPrice !== calculatedTotal) {
                    setValue(`details.${index}.totalPrice`, calculatedTotal, {shouldValidate: true});
                }
            });
        }
    }, [watchDetails, setValue]);

    const grandTotal = watchDetails?.reduce((sum, item) => sum + (item?.totalPrice || 0), 0) || 0;

    const onSubmit = async (data: ReceiptFormValues) => {
        try {
            const response = await axiosClient.post('/supply-receipts', data);
            alert('Tạo phiếu nhập kho thành công! ID: ' + (response as any).id);
        } catch (error: any) {
            alert('Lỗi: ' + (error.response?.data?.message || 'Không thể tạo phiếu'));
        }
    };

    const docSoThanhChu = (so: number): string => {
        if (so === 0) return 'Không đồng';
        return '................................................................................';
    };

    return (
        /* SỬA LỖI 1: Phải có thẻ form bọc ngoài cùng */
        <form onSubmit={handleSubmit(onSubmit)} style={{background: '#f0f2f5', padding: '20px', minHeight: '100vh'}}>
            <div
                style={{
                    fontFamily: '"Times New Roman", Times, serif',
                    color: '#000',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    padding: '40px',
                    border: '1px solid #ccc',
                    marginBottom: '30px',
                    background: '#fff',
                    maxWidth: '1100px',
                    margin: '0 auto',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}>
                {/* --- HEADER --- */}
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                    <div>
                        <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '5px'}}>
                            <span style={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>Đơn vị:</span>
                            <input {...register('organizationName')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '250px', marginLeft: '10px', fontSize: '16px'}} />
                        </div>
                        <div style={{display: 'flex', alignItems: 'flex-end'}}>
                            <span style={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>Bộ phận:</span>
                            <input {...register('departmentName')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '235px', marginLeft: '10px', fontSize: '16px'}} />
                        </div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <div style={{fontWeight: 'bold'}}>Mẫu số 01 - VT</div>
                        <div style={{fontStyle: 'italic', fontSize: '14px'}}>(Ban hành theo Thông tư số 200/2014/TT-BTC)</div>
                    </div>
                </div>

                {/* --- TITLE --- */}
                <div style={{position: 'relative', textAlign: 'center', marginBottom: '30px'}}>
                    <h2 style={{margin: '0 0 10px 0', fontSize: '26px', fontWeight: 'bold'}}>PHIẾU NHẬP KHO</h2>

                    <div style={{fontStyle: 'italic', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
                        <span>Ngày</span>
                        <input type="date" {...register('entryDate')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', cursor: 'pointer'}} />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px'}}>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <span>Số:</span>
                            <input
                                {...register('receiptNumber')}
                                placeholder="Số phiếu"
                                style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '80px', textAlign: 'center'}}
                            />

                            {/* SỬA LỖI 2: Thêm receiptCode (Bắt buộc trong Schema) */}
                            <span style={{marginLeft: '10px'}}>Mã:</span>
                            <input
                                {...register('receiptCode')}
                                placeholder="Mã nội bộ"
                                style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '80px', textAlign: 'center'}}
                            />
                        </div>
                        {(errors.receiptNumber || errors.receiptCode) && <div style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>* Vui lòng nhập Số và Mã phiếu</div>}
                    </div>

                    <div style={{position: 'absolute', top: '10px', right: '20px', textAlign: 'left', fontSize: '15px'}}>
                        <div>
                            Nợ: <input {...register('debitAccount')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '80px'}} />
                        </div>
                        <div style={{marginTop: '5px'}}>
                            Có: <input {...register('creditAccount')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '80px'}} />
                        </div>
                    </div>
                </div>

                {/* --- THÔNG TIN NGƯỜI GIAO --- */}
                <div style={{marginBottom: '25px'}}>
                    <div style={{display: 'flex', marginBottom: '12px'}}>
                        <span style={{whiteSpace: 'nowrap'}}>- Họ và tên người giao: </span>
                        <input {...register('delivererName')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', flex: 1, marginLeft: '10px'}} />
                    </div>

                    <div style={{display: 'flex', marginBottom: '12px', flexWrap: 'wrap', gap: '5px'}}>
                        <span style={{whiteSpace: 'nowrap'}}>- Theo</span>
                        <input
                            {...register('sourceDocType')}
                            placeholder="Hóa đơn/Lệnh"
                            style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '120px', textAlign: 'center'}}
                        />
                        <span>số</span>
                        <input {...register('sourceDocNo')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '80px', textAlign: 'center'}} />
                        <span>ngày</span>
                        <input type="date" {...register('sourceDocDate')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none'}} />
                        <span>của</span>
                        <input {...register('sourceDocIssuer')} style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', flex: 1}} />
                    </div>

                    <div style={{display: 'flex'}}>
                        <span style={{whiteSpace: 'nowrap'}}>- Nhập tại kho:</span>
                        <input
                            type="number"
                            {...register('warehouseId', {valueAsNumber: true})}
                            placeholder="ID Kho"
                            style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', width: '100px', textAlign: 'center', marginLeft: '5px'}}
                        />
                        <span style={{marginLeft: '10px'}}>- Địa điểm:</span>
                        <input disabled placeholder="(Tự động hiển thị)" style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', flex: 1, marginLeft: '5px', fontStyle: 'italic'}} />
                    </div>
                </div>

                {/* --- BẢNG CHI TIẾT --- */}
                <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '15px'}}>
                    <thead>
                        <tr style={{textAlign: 'center', fontWeight: 'bold'}}>
                            <th rowSpan={2} style={{border: '1px solid #000', width: '40px'}}>
                                STT
                            </th>
                            <th rowSpan={2} style={{border: '1px solid #000'}}>
                                Tên, nhãn hiệu vật tư...
                            </th>
                            <th rowSpan={2} style={{border: '1px solid #000', width: '80px'}}>
                                Mã số
                            </th>
                            <th rowSpan={2} style={{border: '1px solid #000', width: '70px'}}>
                                ĐVT
                            </th>
                            <th colSpan={2} style={{border: '1px solid #000'}}>
                                Số lượng
                            </th>
                            <th rowSpan={2} style={{border: '1px solid #000', width: '100px'}}>
                                Đơn giá
                            </th>
                            <th rowSpan={2} style={{border: '1px solid #000', width: '120px'}}>
                                Thành tiền
                            </th>
                            <th rowSpan={2} style={{border: '1px solid #000', width: '40px'}}>
                                Xóa
                            </th>
                        </tr>
                        <tr style={{textAlign: 'center', fontWeight: 'bold'}}>
                            <th style={{border: '1px solid #000', width: '80px'}}>Chứng từ</th>
                            <th style={{border: '1px solid #000', width: '80px'}}>Thực nhập</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => (
                            <tr key={field.id}>
                                <td style={{border: '1px solid #000', textAlign: 'center'}}>{index + 1}</td>
                                <td style={{border: '1px solid #000'}}>
                                    <input style={{border: 'none', outline: 'none', width: '100%', padding: '5px'}} />
                                </td>
                                <td style={{border: '1px solid #000'}}>
                                    <input
                                        type="number"
                                        {...register(`details.${index}.itemId` as const, {valueAsNumber: true})}
                                        style={{border: 'none', outline: 'none', width: '100%', textAlign: 'center'}}
                                    />
                                </td>
                                <td style={{border: '1px solid #000'}}>
                                    <input style={{border: 'none', outline: 'none', width: '100%', textAlign: 'center'}} />
                                </td>
                                <td style={{border: '1px solid #000'}}>
                                    <input
                                        type="number"
                                        {...register(`details.${index}.docQuantity` as const, {valueAsNumber: true})}
                                        style={{border: 'none', outline: 'none', width: '100%', textAlign: 'right'}}
                                    />
                                </td>
                                <td style={{border: '1px solid #000'}}>
                                    <input
                                        type="number"
                                        {...register(`details.${index}.actualQuantity` as const, {valueAsNumber: true})}
                                        style={{border: 'none', outline: 'none', width: '100%', textAlign: 'right'}}
                                    />
                                </td>
                                <td style={{border: '1px solid #000'}}>
                                    <input
                                        type="number"
                                        {...register(`details.${index}.unitPrice` as const, {valueAsNumber: true})}
                                        style={{border: 'none', outline: 'none', width: '100%', textAlign: 'right'}}
                                    />
                                </td>
                                <td style={{border: '1px solid #000'}}>
                                    <input
                                        type="number"
                                        readOnly
                                        {...register(`details.${index}.totalPrice` as const, {valueAsNumber: true})}
                                        style={{border: 'none', outline: 'none', width: '100%', textAlign: 'right', background: '#f9f9f9', fontWeight: 'bold'}}
                                    />
                                </td>
                                <td style={{border: '1px solid #000', textAlign: 'center'}}>
                                    <button type="button" onClick={() => remove(index)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold'}}>
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button
                    type="button"
                    onClick={() => append({itemId: 1, docQuantity: 0, actualQuantity: 0, unitPrice: 0, totalPrice: 0})}
                    style={{padding: '5px 15px', cursor: 'pointer', background: '#fff', border: '1px solid #999', borderRadius: '4px', marginBottom: '20px'}}>
                    + Thêm dòng vật tư
                </button>

                {/* --- FOOTER --- */}
                <div style={{marginTop: '20px'}}>
                    <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '10px'}}>
                        <span style={{fontWeight: 'bold'}}>- Cộng thành tiền (bằng chữ): </span>
                        <span style={{flex: 1, marginLeft: '10px', borderBottom: '1px dotted #000', fontStyle: 'italic'}}>{docSoThanhChu(grandTotal)}</span>
                    </div>

                    <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '30px'}}>
                        <span>- Số chứng từ gốc kèm theo: </span>
                        <input
                            {...register('attachedDocNote')}
                            placeholder="Ghi chú hóa đơn..."
                            style={{border: 'none', borderBottom: '1px dotted #000', outline: 'none', flex: 1, marginLeft: '10px'}}
                        />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', textAlign: 'center', fontWeight: 'bold', marginTop: '40px'}}>
                        <div>
                            <div>Người lập phiếu</div>
                            <div style={{fontWeight: 'normal', fontStyle: 'italic', fontSize: '14px'}}>(Ký, họ tên)</div>
                            <input {...register('creatorName')} style={{border: 'none', borderBottom: '1px dotted #999', outline: 'none', width: '80%', marginTop: '50px', textAlign: 'center'}} />
                        </div>
                        <div>
                            <div>Người giao hàng</div>
                            <div style={{fontWeight: 'normal', fontStyle: 'italic', fontSize: '14px'}}>(Ký, họ tên)</div>
                        </div>
                        <div>
                            <div>Thủ kho</div>
                            <div style={{fontWeight: 'normal', fontStyle: 'italic', fontSize: '14px'}}>(Ký, họ tên)</div>
                            <input {...register('storekeeperName')} style={{border: 'none', borderBottom: '1px dotted #999', outline: 'none', width: '80%', marginTop: '50px', textAlign: 'center'}} />
                        </div>
                        <div>
                            <div style={{fontWeight: 'normal', fontStyle: 'italic', fontSize: '15px', marginBottom: '5px'}}>
                                Ngày{' '}
                                <input
                                    type="date"
                                    {...register('signedDate')}
                                    style={{
                                        border: 'none',
                                        borderBottom: '1px dotted #000',
                                        outline: 'none',
                                        background: 'transparent',
                                        width: '125px',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                            <div>Kế toán trưởng</div>
                            <div style={{fontWeight: 'normal', fontStyle: 'italic', fontSize: '13px'}}>(Hoặc bộ phận có nhu cầu nhập)</div>
                            <div style={{fontWeight: 'normal', fontStyle: 'italic', fontSize: '14px'}}>(Ký, họ tên)</div>
                            <input
                                {...register('chiefAccountantName')}
                                placeholder="Gõ tên..."
                                style={{border: 'none', borderBottom: '1px dotted #ccc', outline: 'none', width: '85%', marginTop: '41px', textAlign: 'center', fontFamily: 'inherit'}}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* NÚT LƯU NẰM NGOÀI TỜ GIẤY */}
            <div style={{maxWidth: '1100px', margin: '0 auto', textAlign: 'right'}}>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        background: '#1890ff',
                        color: 'white',
                        border: 'none',
                        padding: '15px 40px',
                        fontSize: '18px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                    {isSubmitting ? 'ĐANG LƯU HỆ THỐNG...' : 'XÁC NHẬN LƯU PHIẾU'}
                </button>
            </div>
        </form>
    );
};
