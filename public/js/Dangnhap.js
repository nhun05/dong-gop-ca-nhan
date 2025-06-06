// Ẩn hiện form đăng nhập và khôi phục
document.getElementById("forgotLink").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("resetForm").style.display = "block";
});

document.getElementById("backToLogin").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("resetForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});

// Xử lý đăng nhập
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value;

  // Lấy thông tin người dùng đã đăng ký từ localStorage
  const storedUser = JSON.parse(localStorage.getItem("userData"));

  if (!storedUser) {
    alert("Không tìm thấy người dùng đã đăng ký.");
    return;
  }

  // Kiểm tra email và mật khẩu
  if (emailInput === storedUser.email && passwordInput === storedUser.password) {
    // Lưu phiên đăng nhập (giả lập)
    localStorage.setItem("user", JSON.stringify({
      name: storedUser.name,
      email: storedUser.email
    }));

    alert("Đăng nhập thành công!");
   window.location.href = "Trangchu.html"; 
  } else {
    alert("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
  }
});

// Gửi lại mật khẩu khi người dùng quên
document.getElementById("sendResetBtn").addEventListener("click", function () {
  const resetEmail = document.getElementById("resetEmail").value.trim();

  // Lấy thông tin người dùng đã đăng ký
  const storedUser = JSON.parse(localStorage.getItem("userData"));

  if (storedUser && resetEmail === storedUser.email) {
    alert(`Mật khẩu của bạn là: ${storedUser.password}`);
    document.getElementById("resetForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  } else {
    alert("Email không tồn tại trong hệ thống.");
  }
});

