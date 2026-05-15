import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'inventory_db',
    password: process.env.DB_PASSWORD || 'secretpassword',
    port: parseInt(process.env.DB_PORT || '5532')
});
