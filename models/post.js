const db = require('../config/db');

const Post = {
  create: (userId, title, content, callback) => {
    const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
    db.query(sql, [userId, title, content], callback);
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM posts ORDER BY post_time DESC';
    db.query(sql, callback);
  }
};

module.exports = Post;


