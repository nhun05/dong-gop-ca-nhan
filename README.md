<<<<<<< HEAD
# studyforum
A study forum website using Node.js, ExpressJS, EJS and MySQL created as final project for the subject "Web Design and Programming" at Hanoi University of Science and Technology.

## Group's members: Group 8
| STT | Họ tên                 |    MSSV    | Chức năng đảm nhận                                                        |
| --- | -----------------------|------------|---------------------------------------------------------------------------|
|  1  | Lưu Quỳnh Anh          | 20221830   | Bình luận bài viết, Tải lại bài cùng bình luận, Đánh giá bài viết (hữu ích, không hữu ích), Tải bài viết |
|  2  | Vũ Ngọc Ánh            | 20221836   | Đăng ký, đăng nhập, Đăng bài viết, upload file đính kèm, Xem bài viết, Xóa và chỉnh sửa bài viết, Tìm kiếm|
|  3  | Tống Thị Hồng Nhung    | 20221863   | Bình luận bài viết, Tải lại bài cùng bình luận, Đánh giá bài viết (hữu ích, không hữu ích), Tải bài viết|
|  4  | Vũ Hồng Nhung          | 20221864   | Đăng ký, đăng nhập, Đăng bài viết, upload file đính kèm, Xem bài viết, Xóa và chỉnh sửa bài viết, Tìm kiếm, Bình luận bài viết, Tải lại bài cùng bình luận |

## Installation
Make sure you have Node.js installed on your computer. If not, you can download it [here](https://nodejs.org/en/download/)

Download this repository

Install the dependencies
```
npm install
```

Install mysql server and start it (This instruction is for Ubuntu, for other OS, please refer to the official documentation of MySQL)

` sudo apt update `

` sudo apt install mysql-server `

` sudo service mysql start `

Execute these queries in MySQL
```
CREATE USER 'root'@'localhost' IDENTIFIED BY '@Nhungvu123';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
CREATE DATABASE project;
USE project;
```

Now run the file `project.sql` in MySQL

```mysql -u root -p project < project.sql```


## Compiles and hot-reloads for development
```
npm run dev
``` 

## Completion Level (self-assessment, based on our Professor's requirements)

| STT | Yêu cầu                                                       | Điểm | Tự đánh giá     |
| --- | --------------------------------------------------------------|------| --------------- |
| 1   | Giao diện người dùng có thể tương tác                         |1     | Hoàn thành      |
| 2   | Server xử lý đúng logic và kết nối thành công với frontend.   |1     | Hoàn thành      |
| 3   | Frontend ↔ Backend ↔ Database hoạt động trơn tru.             |1     | Hoàn thành      |
| 4   | Ít lỗi, có từ 2+ chức năng chính và có thể sử dụng.           |1     | Hoàn thành      |
| 5   | Thực hiện được các thao tác: tạo, đọc, cập nhật, xóa dữ liệu  |1     | Hoàn thành      |
=======
# dong-gop-ca-nhan
>>>>>>> c28c2ad327c14301e9d7da284f1aff58ec21a56d
