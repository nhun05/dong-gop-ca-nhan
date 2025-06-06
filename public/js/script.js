document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('button');
  if (btn) {
    btn.addEventListener('click', () => {
      btn.innerText = 'Đang xử lý...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerText = 'Đăng ký';
        btn.disabled = false;
      }, 1000);
    });
  }
});