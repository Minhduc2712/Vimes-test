import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routes/index.js';
import { HttpError } from './errors/httpErrors.js';
export const app = express();
dotenv.config();
app.use(express.json());
app.use('/api', apiRouter);
app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof HttpError) {
        res.status(err.status).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
});
const port = Number(process.env.PORT ?? 3000);
// THAY ĐỔI 2: Chỉ listen nếu KHÔNG PHẢI môi trường test
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}
//# sourceMappingURL=index.js.map