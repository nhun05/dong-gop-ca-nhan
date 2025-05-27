const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Cấu hình static file
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Các route hiển thị HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Trangchu.html"));
});

app.get("/dangky", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Dangky.html"));
});

app.get("/dangnhap", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Dangnhap.html"));
});

app.get("/baiviet", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Baiviet.html"));
});

// Các xử lý POST form (tùy chọn)
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log("Đăng ký:", username, password);
  res.redirect("/dangnhap");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
