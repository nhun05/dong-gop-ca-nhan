const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '@Nhungvu123',
    database: 'project',
    charset: 'utf8mb4'
};

const pool = mysql.createPool(dbConfig);

async function sqlQuery(query, params = []) {
    try {
        const connection = await pool.getConnection();  // Get connection from the pool
        const [results] = await connection.execute(query, params);
        connection.release();  // Release the connection back to the pool
        return results;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

module.exports = {
    sqlQuery,
    pool
};
