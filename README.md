Vimes Test
Kho này gồm 2 phần chính:

import-inventory-vimes: API quản lý nhập kho vật tư y tế (Express + TypeScript + PostgreSQL).
vimes-frontend: giao diện React (Vite + TypeScript).
Yêu cầu
Node.js (khuyến nghị bản LTS)
PostgreSQL hoặc Docker
Cấu trúc thư mục
import-inventory-vimes/   # Backend API
vimes-frontend/           # Frontend UI
Thiết lập nhanh
1) Backend (import-inventory-vimes)
cd import-inventory-vimes
npm install

Chạy server:

npm run dev
Build & start:

npm run build
npm start
2) Frontend (vimes-frontend)
cd vimes-frontend
npm install
npm run dev
Build:

npm run build
API chính
Base URL: http://localhost:3000/api

GET /health
/warehouses
/medical-supplies
/supply-receipts
Kiểm thử
Backend:

cd import-inventory-vimes
npm test
Frontend:

cd vimes-frontend
npm test
Troubleshooting
Nếu gặp lỗi eslint/vitest not found, hãy chạy lại npm install trong thư mục tương ứng.
Nếu gặp lỗi vitest: Permission denied, thử xóa node_modules và cài lại để khôi phục quyền thực thi.
