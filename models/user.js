const db = require('../config/db');

const User = {
  findByUsername: (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], callback);
  },

  create: (username, password, email, callback) => {
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(sql, [username, password, email], callback);
  }
};

module.exports = User;

