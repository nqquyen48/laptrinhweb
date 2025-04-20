document.addEventListener("DOMContentLoaded", () => {
    // Lọc sản phẩm theo danh mục
    const categoryLinks = document.querySelectorAll(".category__link");
    const products = document.querySelectorAll(".popular__card");
    let visibleProducts = Array.from(products); // Danh sách sản phẩm hiển thị sau khi lọc
    let originalOrder = Array.from(products); // Lưu trữ thứ tự ban đầu
  
    // Lọc theo danh mục
    categoryLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedCategory = link.getAttribute("data-category");
  
        // Xóa class active khỏi tất cả các link
        categoryLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
  
        // Lọc sản phẩm theo danh mục
        visibleProducts = Array.from(products).filter((product) => {
          const productCategory = product.getAttribute("data-category");
          return selectedCategory === "all" || productCategory === selectedCategory;
        });
  
        // Reset về trang 1 sau khi lọc và cập nhật lại phân trang
        currentPage = 1;
        updatePagination();
        displayPage(currentPage);
        updatePageInfo();
      });
    });
  
    // Phân trang
    const itemsPerPage = 20; // Số sản phẩm mỗi trang
    let currentPage = 1;
    let totalItems = products.length; // Tổng số sản phẩm ban đầu: 26
    let totalPages = Math.ceil(totalItems / itemsPerPage); // Tổng số trang ban đầu: 2
  
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");
  
    // Hàm cập nhật tổng số sản phẩm và số trang sau khi lọc
    function updatePagination() {
      totalItems = visibleProducts.length; // Tổng số sản phẩm hiển thị
      totalPages = Math.ceil(totalItems / itemsPerPage); // Tính lại số trang
    }
  
    // Hàm hiển thị sản phẩm trên trang hiện tại
    function displayPage(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
  
      // Ẩn tất cả sản phẩm trước
      products.forEach((product) => {
        product.style.display = "none";
      });
  
      // Hiển thị các sản phẩm trong phạm vi trang hiện tại
      visibleProducts.forEach((product, index) => {
        if (index >= start && index < end) {
          product.style.display = "block";
        }
      });
  
      // Cập nhật trạng thái nút
      prevPageBtn.disabled = page === 1;
      nextPageBtn.disabled = page === totalPages || totalPages === 0;
    }
  
    // Hàm cập nhật thông tin trang
    function updatePageInfo() {
      pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;
    }
  
    // Xử lý nút "Trước"
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePageInfo();
      }
    });
  
    // Xử lý nút "Sau"
    nextPageBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePageInfo();
      }
    });
  
    // Hàm trích xuất giá từ sản phẩm
    function extractPrice(product) {
      const priceElement = product.querySelector(".popular__card__header h4:last-child");
      if (!priceElement || !priceElement.textContent) {
        console.warn("Không tìm thấy giá cho sản phẩm:", product);
        return 0; // Trả về 0 nếu không tìm thấy giá
      }
      const priceText = priceElement.textContent.replace(/[^0-9]/g, ""); // Loại bỏ tất cả ký tự không phải số
      const price = parseFloat(priceText);
      return isNaN(price) ? 0 : price; // Trả về 0 nếu giá không hợp lệ
    }
  
    // Xử lý các nút lọc (Phù hợp, Bán chạy, Hàng mới, Giá thấp - cao, Giá cao - thấp)
    const filterTabs = document.querySelectorAll(".filter__tab");
  
    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Xóa class active khỏi tất cả các tab
        filterTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
  
        const filterType = tab.textContent.trim(); // Lấy loại lọc: "Phù hợp", "Bán chạy", ...
  
        // Sắp xếp visibleProducts theo loại lọc
        if (filterType === "Phù hợp") {
          // Sắp xếp theo thứ tự ban đầu
          visibleProducts = originalOrder.filter((product) =>
            visibleProducts.includes(product)
          );
        } else if (filterType === "Bán chạy") {
          // Sắp xếp theo số lượng đã bán (giảm dần)
          visibleProducts.sort((a, b) => {
            const soldA = parseInt(
              a.querySelector(".popular__content p").textContent.match(/\d+/)[0]
            );
            const soldB = parseInt(
              b.querySelector(".popular__content p").textContent.match(/\d+/)[0]
            );
            return soldB - soldA;
          });
        } else if (filterType === "Hàng mới") {
          // Sắp xếp theo data-id (giảm dần - sản phẩm mới có id lớn hơn)
          visibleProducts.sort((a, b) => {
            const idA = parseInt(a.getAttribute("data-id"));
            const idB = parseInt(b.getAttribute("data-id"));
            return idB - idA;
          });
        } else if (filterType === "Giá thấp - cao") {
          // Sắp xếp theo giá (tăng dần)
          visibleProducts.sort((a, b) => {
            const priceA = extractPrice(a);
            const priceB = extractPrice(b);
            return priceA - priceB;
          });
        } else if (filterType === "Giá cao - thấp") {
          // Sắp xếp theo giá (giảm dần)
          visibleProducts.sort((a, b) => {
            const priceA = extractPrice(a);
            const priceB = extractPrice(b);
            return priceB - priceA;
          });
        }
  
        // Reset về trang 1 sau khi lọc và cập nhật lại phân trang
        currentPage = 1;
        updatePagination();
        displayPage(currentPage);
        updatePageInfo();
      });
    });
  
    // Hiển thị trang đầu tiên khi tải trang
    updatePagination();
    displayPage(currentPage);
    updatePageInfo();
  });