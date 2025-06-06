const { sqlQuery } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký
exports.register = async (req, res) => {
  const { name, email, password, dob } = req.body;

  try {
    // Kiểm tra email đã tồn tại chưa
    const existing = await sqlQuery("SELECT * FROM nguoidung WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại. Vui lòng dùng email khác." });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm người dùng
    await sqlQuery(
      "INSERT INTO nguoidung (ten_nguoi_dung, email, mat_khau, ngay_sinh) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, dob]
    );

    return res.status(201).json({ message: "Đăng ký thành công!" });

  } catch (err) {
    // Trường hợp hiếm bị chèn trùng vì 2 request chạy gần như cùng lúc
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email đã được sử dụng. Vui lòng chọn email khác." });
    }

    console.error("Lỗi đăng ký:", err);
    return res.status(500).json({ message: "Lỗi máy chủ. Vui lòng thử lại sau." });
  }
};


// Đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ email và mật khẩu" });
    }

    const users = await sqlQuery(
      "SELECT nguoi_dung_id, ten_nguoi_dung, email, mat_khau AS password_hash, ngay_sinh FROM nguoidung WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign(
      { id: user.nguoi_dung_id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.nguoi_dung_id,
        name: user.ten_nguoi_dung,
        email: user.email,
        dob: user.ngay_sinh
      }
    });

  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};