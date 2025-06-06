const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');

// Giao diện
router.get('/', (req, res) => res.sendFile('Trangchu.html', { root: path.join(__dirname, '../views') }));
router.get('/dangky', (req, res) => res.sendFile('Dangky.html', { root: path.join(__dirname, '../views') }));
router.get('/dangnhap', (req, res) => res.sendFile('Dangnhap.html', { root: path.join(__dirname, '../views') }));
// Xử lý form
router.post('/dangky', userController.register);
router.post('/dangnhap', userController.login);

const postController = require('../controllers/postController');

router.get('/dangbai', (req, res) => {
  res.sendFile(__dirname + '/../views/Dangbai.html');
});

router.post('/dangbai', postController.createPost);

const db = require('../database/mysqlUtils');

router.get('/check-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS time');
    res.json({ message: 'Kết nối thành công!', serverTime: rows[0].time });
  } catch (err) {
    res.status(500).json({ message: 'Kết nối thất bại!', error: err.message });
  }
});



module.exports = router;






