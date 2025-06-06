const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticate = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

// Cấu hình lưu file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Bộ lọc loại file (tùy chọn)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg", "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File không được hỗ trợ."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // tối đa 5MB
});

// ====== ROUTES =======

// Đăng bài viết (kèm file ảnh/tài liệu)
router.post("/", authenticate, upload.single("file"), postController.createPost);

// Lấy tất cả bài viết
router.get("/", authenticate, postController.getPosts);

// Lấy 1 bài viết theo ID
router.get("/:id", authenticate, postController.getPostById);

// Cập nhật bài viết
router.put("/:id", authenticate, postController.updatePost);

// Xoá bài viết
router.delete("/:id", authenticate, postController.deletePost);

module.exports = router;
