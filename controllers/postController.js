const { sqlQuery, pool } = require("../config/db");

// Đăng bài viết
exports.createPost = async (req, res) => {
  const { tieu_de, noi_dung } = req.body;
  const nguoi_dung_id = req.user.nguoi_dung_id;

  if (!tieu_de || !noi_dung) {
    return res.status(400).json({ message: "Thiếu tiêu đề hoặc nội dung" });
  }

  const filePath = req.file ? "/uploads/" + req.file.filename : null;
  const originalName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : null;

  const query = `
    INSERT INTO baiviet (tieu_de, noi_dung, tep_dinh_kem, ten_file_goc, nguoi_dung_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await sqlQuery(query, [tieu_de, noi_dung, filePath, originalName, nguoi_dung_id]);
  const post_id = result.insertId;

  // Lưu vào bảng tailieu nếu có file
  if (filePath && originalName) {
    await sqlQuery(`
      INSERT INTO tailieu (ten_tai_lieu, duong_dan, bai_viet_id)
      VALUES (?, ?, ?)
    `, [originalName, filePath, post_id]);
  }

  res.status(201).json({ message: "Đăng bài thành công", post_id });
};


// Hiển thị bài viết
exports.getPosts = async (req, res) => {
  const query = `
    SELECT b.*, u.ten_nguoi_dung AS username,
      tl.ten_tai_lieu, tl.duong_dan,
      (SELECT COUNT(*) FROM luot_tai lt WHERE lt.bai_viet_id = b.bai_viet_id) AS so_luot_tai
    FROM baiviet b
    LEFT JOIN nguoidung u ON b.nguoi_dung_id = u.nguoi_dung_id
    LEFT JOIN tailieu tl ON tl.bai_viet_id = b.bai_viet_id
    ORDER BY b.thoi_gian_dang DESC
  `;

  try {
    const posts = await sqlQuery(query);
    res.json({ posts });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách bài viết:", err);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT b.*, u.ten_nguoi_dung AS username
    FROM baiviet b
    LEFT JOIN nguoidung u ON b.nguoi_dung_id = u.nguoi_dung_id
    WHERE b.bai_viet_id = ?
  `;
  const result = await sqlQuery(query, [id]);
  if (result.length === 0) {
    return res.status(404).json({ message: "Không tìm thấy bài viết" });
  }
  res.json({ post: result[0] });
};



// Chỉnh sửa bài viết
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { noi_dung } = req.body;
  const nguoi_dung_id = req.user.nguoi_dung_id;

  const result = await sqlQuery(
    "UPDATE baiviet SET noi_dung = ? WHERE bai_viet_id = ? AND nguoi_dung_id = ?",
    [noi_dung, id, nguoi_dung_id]
  );

  if (result.affectedRows === 0) {
    return res.status(403).json({ message: "Không có quyền sửa bài viết hoặc bài viết không tồn tại" });
  }

  res.json({ message: "Cập nhật bài viết thành công" });
};


// Xóa bài viết
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const nguoi_dung_id = req.user.nguoi_dung_id;

  const result = await sqlQuery(
    "DELETE FROM baiviet WHERE bai_viet_id = ? AND nguoi_dung_id = ?",
    [id, nguoi_dung_id]
  );

  if (result.affectedRows === 0) {
    return res.status(403).json({ message: "Không có quyền xóa bài viết hoặc bài viết không tồn tại" });
  }

  res.json({ message: "Xóa bài viết thành công" });
};


// Bình luận
//Thêm bình luận
exports.addComment = async (req, res) => {
  const bai_viet_id = parseInt(req.params.id);
  const { noi_dung } = req.body;
  const nguoi_dung_id = req.user.nguoi_dung_id;

  if (!noi_dung) return res.status(400).json({ message: "Bình luận không được để trống." });

  await sqlQuery(
    `INSERT INTO binhluan (bai_viet_id, nguoi_dung_id, noi_dung) VALUES (?, ?, ?)`,
    [bai_viet_id, nguoi_dung_id, noi_dung]
  );

  res.json({ message: "Đã thêm bình luận." });
};

// Lấy bình luận (Hiển thị bình luậnluận)
exports.getComments = async (req, res) => {
  const { id } = req.params;

  const comments = await sqlQuery(`
    SELECT b.noi_dung, b.thoi_gian_phan_hoi, u.ten_nguoi_dung AS username
    FROM binhluan b
    JOIN nguoidung u ON b.nguoi_dung_id = u.nguoi_dung_id
    WHERE b.bai_viet_id = ?
    ORDER BY b.thoi_gian_phan_hoi ASC
  `, [id]);

  res.json({ comments });
};

// Đánh giá
exports.ratePost = async (req, res) => {
  const bai_viet_id = parseInt(req.params.id);
  const nguoi_dung_id = req.user.nguoi_dung_id;
  const { loai } = req.body; // 'like' hoặc 'dislike'

  if (!['like', 'dislike'].includes(loai)) {
    return res.status(400).json({ message: "Loại đánh giá không hợp lệ." });
  }

  const huu_ich = loai === 'like' ? 1 : 0;

  try {
    await sqlQuery(
      `INSERT INTO danhgia (bai_viet_id, nguoi_dung_id, huu_ich)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE huu_ich = VALUES(huu_ich)`,
      [bai_viet_id, nguoi_dung_id, huu_ich]
    );

    res.status(200).json({ message: "Đánh giá đã được ghi nhận." });
  } catch (err) {
    console.error("Lỗi khi đánh giá:", err);
    res.status(500).json({ message: "Lỗi khi ghi nhận đánh giá." });
  }
};


// Tải tài liệu
const path = require("path");

exports.handleDownload = async (req, res) => {
  const filename = req.params.filename;
  const nguoi_dung_id = req.user.nguoi_dung_id;

  const filePath = path.join(__dirname, "../uploads", filename);

  const result = await sqlQuery(`
    SELECT bai_viet_id, ten_tai_lieu FROM tailieu WHERE duong_dan LIKE ?
  `, [`%${filename}`]);

  if (result.length === 0) {
    return res.status(404).json({ message: "Không tìm thấy tài liệu." });
  }

  const { bai_viet_id, ten_tai_lieu } = result[0];

  // Ghi lượt tải
  await sqlQuery(`
    INSERT INTO luot_tai (nguoi_dung_id, bai_viet_id, ten_file)
    VALUES (?, ?, ?)
  `, [nguoi_dung_id, bai_viet_id, ten_tai_lieu]);

  res.download(filePath, ten_tai_lieu, err => {
    if (err) {
      console.error("Lỗi khi tải:", err);
      res.status(500).send("Không thể tải file.");
    }
  });
};

// Hiển thị tài liệu được tải
exports.logDownload = async (req, res) => {
  const { bai_viet_id, ten_tai_lieu, duong_dan } = req.body;
  const nguoi_dung_id = req.user.nguoi_dung_id;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Khóa dòng tài liệu (nếu có) để tránh race condition
    const [existing] = await connection.query(
      `SELECT * FROM tailieu WHERE duong_dan = ? AND bai_viet_id = ? FOR UPDATE`,
      [duong_dan, bai_viet_id]
    );

    if (existing.length === 0) {
      await connection.query(
        `INSERT INTO tailieu (ten_tai_lieu, duong_dan, bai_viet_id)
         VALUES (?, ?, ?)`,
        [ten_tai_lieu, duong_dan, bai_viet_id]
      );
    }

    // Ghi vào bảng luot_tai
    await connection.query(
      `INSERT INTO luot_tai (nguoi_dung_id, bai_viet_id, ten_file)
       VALUES (?, ?, ?)`,
      [nguoi_dung_id, bai_viet_id, ten_tai_lieu]
    );

    await connection.commit();
    res.status(200).json({ message: "Đã ghi nhận lượt tải." });
  } catch (err) {
    await connection.rollback();
    console.error("Lỗi ghi lượt tải:", err);
    res.status(500).json({ message: "Ghi nhận lượt tải thất bại." });
  } finally {
    connection.release();
  }
};

// Tìm kiếm bài viết theo từ khóa (trong tiêu đề hoặc nội dung)
exports.searchPosts = async (req, res) => {
  const { keyword } = req.body;
  const like = `%${keyword}%`;

  try {
    const results = await sqlQuery(`
      SELECT bai_viet_id, tieu_de, noi_dung, thoi_gian_dang
      FROM baiviet
      WHERE tieu_de LIKE ? OR noi_dung LIKE ?
      ORDER BY thoi_gian_dang DESC
    `, [like, like]);

    res.json(results);
  } catch (err) {
    console.error("Lỗi khi tìm kiếm bài viết:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi tìm kiếm" });
  }
};
