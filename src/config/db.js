import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

console.log('Database config check:', {
  hasDatabaseUrl: !!process.env.DATABASE_URL,
  url: process.env.DATABASE_URL ? 'Present' : 'Missing'
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
  console.log('✅ Connected to Render PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Database connection failed:', err.message);
});

export default pool;