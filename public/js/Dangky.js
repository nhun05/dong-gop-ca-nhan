document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn chặn hành vi submit mặc định

  // Lấy dữ liệu từ các trường nhập
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  // Tạo một object để lưu thông tin người dùng
  const user = {
    name,
    email,
    password,
    dob,
  };

  // Lưu thông tin người dùng vào localStorage
  localStorage.setItem("userData", JSON.stringify(user));

  // Chuyển hướng sang trang đăng nhập
  window.location.href = "Dangnhap.html";
});
