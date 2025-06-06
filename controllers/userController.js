const bcrypt = require('bcryptjs');
const db = require('../database/mysqlUtils');


// Đăng ký
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO NguoiDung (nguoi_dung_id, ten_nguoi_dung, email, mat_khau, ngay_sinh) VALUESS (?, ?)'), [username, hashedPassword];
    res.redirect('/dangnhap');
  } catch (err) {
    res.status(500).send('Lỗi đăng ký: ' + err.message);
  }
};


// Đăng nhậpnhập
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.send('Sai tài khoản');

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) return res.send('Sai mật khẩu');

    req.session.user = rows[0];
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Lỗi đăng nhập: ' + err.message);
  }
};

