# Vimes Test

Kho này gồm 2 phần chính:

- **import-inventory-vimes**: API quản lý nhập kho vật tư y tế (Express + TypeScript + PostgreSQL).
- **vimes-frontend**: giao diện React (Vite + TypeScript).

## Yêu cầu

- Node.js (khuyến nghị bản LTS)
- PostgreSQL hoặc Docker

## Cấu trúc thư mục

```
import-inventory-vimes/   # Backend API
vimes-frontend/           # Frontend UI
```

## Thiết lập nhanh

### 1) Backend (import-inventory-vimes)

```bash
cd import-inventory-vimes
npm install
```

Tạo DB bằng Docker (sẽ chạy script `init.sql`):

```bash
docker-compose up -d
```

> Lưu ý: `docker-compose` mở port `5432`, trong khi `.env` đang để `DB_PORT=5532`.
> Hãy cập nhật `.env` về `5432` hoặc chỉnh lại mapping port trong `docker-compose.yml`.

Chạy server:

```bash
npm run dev
```

Build & start:

```bash
npm run build
npm start
```

### 2) Frontend (vimes-frontend)

```bash
cd vimes-frontend
npm install
npm run dev
```

Build:

```bash
npm run build
```

## API chính

Base URL: `http://localhost:3000/api`

- `GET /health`
- `/warehouses`
- `/medical-supplies`
- `/supply-receipts`

## Kiểm thử

Backend:

```bash
cd import-inventory-vimes
npm test
```

Frontend:

```bash
cd vimes-frontend
npm test
```

## Troubleshooting

- Nếu gặp lỗi `eslint/vitest not found`, hãy chạy lại `npm install` trong thư mục tương ứng.
- Nếu gặp lỗi `vitest: Permission denied`, thử xóa `node_modules` và cài lại để khôi phục quyền thực thi.
