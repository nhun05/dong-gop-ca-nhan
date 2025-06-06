const jwt = require('jsonwebtoken');
const { sqlQuery } = require('../config/db'); // Đảm bảo đúng đường dẫn

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token không được cung cấp' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const result = await sqlQuery("SELECT * FROM nguoidung WHERE nguoi_dung_id = ?", [userId]);
    if (result.length === 0) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    req.user = result[0]; // Gán thông tin người dùng đầy đủ vào req.user
    next();
  } catch (err) {
    console.error("Lỗi xác thực:", err);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

