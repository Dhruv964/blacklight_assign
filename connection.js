import mysql from 'mysql2/promise';
import 'dotenv/config'
const pool = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'test',
  connectTimeout: 10000
});

export default pool;
