# BKDocs - Website Chia sẻ Bài viết

Website cho phép người dùng đăng ký tài khoản, đăng nhập, đăng bài viết kèm file đính kèm, chỉnh sửa, xoá, bình luận, đánh giá và tìm kiếm bài viết.

##  Công nghệ sử dụng

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Cơ sở dữ liệu:** MySQL
- **Xác thực:** JSON Web Token (JWT)
- **Quản lý phiên:** localStorage

---

##  Cài đặt

1. Cài Node.js từ: https://nodejs.org/
2. Cài đặt MySQL server (nếu chưa có).
3. Tạo cơ sở dữ liệu MySQL và tài khoản người dùng:
```sql
CREATE DATABASE project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'bkuser'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON project.* TO 'bkuser'@'localhost';
FLUSH PRIVILEGES;

4. Cài đặt các thư viện Node:
```bash
npm install
```
5. Chạy server:
```bash
node server js
```

---

## Chức năng đã thực hiện

### 1. Đăng ký tài khoản

- **Frontend:** `Dangky.html` gửi form đăng ký với tên, email, mật khẩu, ngày sinh.
- **Backend:** `/auth/register` kiểm tra email, mã hoá mật khẩu bằng `bcrypt`, lưu người dùng mới.
- **CSDL:** bảng `nguoidung`.

### 2. Đăng nhập

- **Frontend:** `Dangnhap.html` gửi email + mật khẩu.
- **Backend:** `/auth/login` kiểm tra thông tin và trả về token JWT.
- **CSDL:** bảng `nguoidung`.

### 3. Đăng bài viết

- **Frontend:** `Baiviet.html` có form nhập nội dung + chọn file, gửi đến `/posts`.
- **Backend:** `/posts` xử lý nội dung và file đính kèm, lưu bài viết.
- **CSDL:** bảng `baiviet`, `tailieu`.

### 4. Chỉnh sửa bài viết

- **Frontend:** Nút “Chỉnh sửa” hiển thị nếu người dùng là tác giả.
- **Backend:** `PUT /posts/:id` cập nhật nội dung bài viết nếu đúng người tạo.
- **CSDL:** bảng `baiviet`.

### 5. Xoá bài viết

- **Frontend:** Nút “Xoá” chỉ hiện với người tạo.
- **Backend:** `DELETE /posts/:id` xác minh quyền trước khi xoá.
- **CSDL:** bảng `baiviet`.

### 6. Tìm kiếm bài viết

- **Frontend:** `Search.html`, nhập từ khoá và gửi tới `/posts/search`.
- **Backend:** Truy vấn `LIKE` theo `tieu_de` hoặc `noi_dung`.
- **CSDL:** bảng `baiviet`.

---

##  Đánh giá hoàn thành

| STT | Chức năng | Tình trạng |
|-----|-----------|------------|
| 1 | Đăng ký | Hoàn thành |
| 2 | Đăng nhập |Hoàn thành  |
| 3 | Đăng bài | Hoàn thành |
| 4 | Sửa bài viết | Hoàn thành |
| 5 | Xoá bài viết | Hoàn thành |
| 6 | Tìm kiếm bài viết | Hoàn thành |
| 7 | Đánh giá bài viết | Hoàn thành |
| 8 | Bình luận bài viết | Hoàn thành |
| 9 | Giao diện responsive cơ bản | Hoàn thành |

---

## Tác giả

- **Nhóm:** [N8]
- **Lớp:** [TK Web AC2070]
- **Trường:** Đại học Bách Khoa Hà Nội

---
