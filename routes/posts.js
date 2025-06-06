const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const postController = require("../controllers/postController");
const authenticate = require("../middlewares/auth");

// Cấu hình multer để lưu file vào thư mục uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


// ----------------- BÀI VIẾT -------------------
// Đăng bài viết (có file đính kèm)
router.post("/", authenticate, upload.single("file"), postController.createPost);

// Lấy tất cả bài viết
router.get("/", authenticate, postController.getPosts);

// Lấy chi tiết 1 bài viết
router.get("/:id", authenticate, postController.getPostById);

// Cập nhật bài viết
router.put("/:id", authenticate, postController.updatePost);

// Xóa bài viết
router.delete("/:id", authenticate, postController.deletePost);


// ----------------- BÌNH LUẬN -------------------
// Thêm bình luận cho bài viết
router.post("/:id/comments", authenticate, postController.addComment);

// Lấy tất cả bình luận cho bài viết
router.get("/:id/comments", authenticate, postController.getComments);


// ----------------- ĐÁNH GIÁ -------------------
// Like / Dislike bài viết
router.post("/:id/rate", authenticate, postController.ratePost);


// ----------------- TẢI TÀI LIỆU -------------------
// Tải file kèm theo và ghi lại lượt tải
router.get("/download/:filename", authenticate, postController.handleDownload);

router.post("/download-log", authenticate, postController.logDownload);

// Tìm kiếm
router.post("/search", postController.searchPosts); 


module.exports = router;



