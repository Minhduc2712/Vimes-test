import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {CreateReceiptPage} from './pages/CreateReceiptPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1
        }
    }
});

const Dashboard = () => <h2>Trang chủ - Hệ thống VIMES</h2>;
const WarehousePage = () => <h2>Quản lý Kho</h2>;
const MedicalSupplyPage = () => <h2>Danh mục Vật tư Y tế</h2>;

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div style={{display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif'}}>
                    {/* Menu Sidebar đơn giản */}
                    <nav style={{width: '250px', background: '#001529', color: 'white', padding: '20px'}}>
                        <h1 style={{color: 'white', fontSize: '20px'}}>VIMES ERP</h1>
                        <ul style={{listStyle: 'none', padding: 0, marginTop: '30px'}}>
                            <li style={{marginBottom: '15px'}}>
                                <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
                                    Bảng điều khiển
                                </Link>
                            </li>
                            <li style={{marginBottom: '15px'}}>
                                <Link to="/warehouses" style={{color: 'white', textDecoration: 'none'}}>
                                    Quản lý Kho
                                </Link>
                            </li>
                            <li style={{marginBottom: '15px'}}>
                                <Link to="/medical-supplies" style={{color: 'white', textDecoration: 'none'}}>
                                    Danh mục Vật tư
                                </Link>
                            </li>
                            <li style={{marginBottom: '15px'}}>
                                <Link to="/supply-receipts/new" style={{color: 'white', textDecoration: 'none'}}>
                                    Lập Phiếu nhập kho
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <main style={{flex: 1, padding: '20px', background: '#f0f2f5'}}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/warehouses" element={<WarehousePage />} />
                            <Route path="/medical-supplies" element={<MedicalSupplyPage />} />
                            <Route path="/supply-receipts/new" element={<CreateReceiptPage />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
