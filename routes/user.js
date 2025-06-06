// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { sqlQuery } = require("../config/db");

router.get("/user", auth, async (req, res) => {
  try {
    const user = req.user; // đã được middleware gán

    res.json({
      name: user.ten_nguoi_dung,
      email: user.email,
      registerDate: user.ngay_dang_ky || user.ngay_sinh || "Không rõ"
    });
  } catch (err) {
    console.error("Lỗi /api/user:", err);
    res.status(500).json({ message: "Không thể lấy thông tin người dùng" });
  }
});

module.exports = router;
