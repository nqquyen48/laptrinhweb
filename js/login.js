document.addEventListener("DOMContentLoaded", () => {
    // Hàm kiểm tra định dạng email
    const isValidEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  
    // Hàm kiểm tra độ dài mật khẩu
    const isValidPassword = (password) => {
      return password.length >= 6;
    };
  
    // Xử lý chuyển đổi tab
    const tabs = document.querySelectorAll(".login__tab");
    const forms = document.querySelectorAll(".login__form");
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabType = tab.getAttribute("data-tab");
  
        // Xóa class active khỏi tất cả các tab và form
        tabs.forEach((t) => t.classList.remove("active"));
        forms.forEach((f) => f.classList.remove("active"));
  
        // Thêm class active cho tab và form được chọn
        tab.classList.add("active");
        document.getElementById(`${tabType}-form`).classList.add("active");
      });
    });
  
    // Xử lý đăng nhập
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
  
      // Kiểm tra định dạng email
      if (!isValidEmail(email)) {
        loginMessage.textContent = "Email không hợp lệ!";
        loginMessage.style.color = "red";
        return;
      }
  
      const storedUser = localStorage.getItem(email);
  
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
          // Lưu trạng thái đăng nhập
          localStorage.setItem("loggedInUser", email);
          loginMessage.textContent = "Đăng nhập thành công!";
          loginMessage.style.color = "green";
          setTimeout(() => {
            window.location.href = "index.html"; // Chuyển hướng về trang chủ
          }, 1000);
        } else {
          loginMessage.textContent = "Mật khẩu không đúng!";
          loginMessage.style.color = "red";
        }
      } else {
        loginMessage.textContent = "Email không tồn tại!";
        loginMessage.style.color = "red";
      }
    });
  
    // Xử lý đăng ký
    const registerForm = document.getElementById("register-form");
    const registerMessage = document.getElementById("register-message");
  
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
  
      // Kiểm tra định dạng email
      if (!isValidEmail(email)) {
        registerMessage.textContent = "Email không hợp lệ!";
        registerMessage.style.color = "red";
        return;
      }
  
      // Kiểm tra độ dài mật khẩu
      if (!isValidPassword(password)) {
        registerMessage.textContent = "Mật khẩu phải có ít nhất 6 ký tự!";
        registerMessage.style.color = "red";
        return;
      }
  
      // Kiểm tra mật khẩu xác nhận
      if (password !== confirmPassword) {
        registerMessage.textContent = "Mật khẩu xác nhận không khớp!";
        registerMessage.style.color = "red";
        return;
      }
  
      // Kiểm tra email đã tồn tại
      if (localStorage.getItem(email)) {
        registerMessage.textContent = "Email đã được đăng ký!";
        registerMessage.style.color = "red";
      } else {
        const user = { email, password };
        localStorage.setItem(email, JSON.stringify(user));
        registerMessage.textContent = "Đăng ký thành công! Vui lòng đăng nhập.";
        registerMessage.style.color = "green";
        setTimeout(() => {
          // Chuyển sang tab đăng nhập
          tabs.forEach((t) => t.classList.remove("active"));
          forms.forEach((f) => f.classList.remove("active"));
          tabs[0].classList.add("active");
          forms[0].classList.add("active");
        }, 1000);
      }
    });
  });