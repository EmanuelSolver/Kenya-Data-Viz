import mysql from 'mysql2/promise'; // Use mysql2/promise for promise-based queries
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const config = mysql.createPool({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database user
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export a promise-based connection for convenience
export const promisePool = config;

// Example usage
async function testConnection() {
  try {
    const [rows] = await promisePool.query('SELECT 1 + 1 AS result');
    console.log('Connection test result:', rows[0].result);
  } catch (error) {
    console.error('Error testing connection:', error);
  }
}

testConnection();
