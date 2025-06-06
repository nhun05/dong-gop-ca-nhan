const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',          
  user: 'root',               
  password: '@Nhungvu123',            
  database: 'web',  // 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Kiểm tra kết nối khi khởi động server (không bắt buộc)
pool.getConnection()
  .then(conn => {
    console.log(' Kết nối MySQL thành công!');
    conn.release();
  })
  .catch(err => {
    console.error(' Lỗi kết nối MySQL:', err.message);
  });

module.exports = pool;


