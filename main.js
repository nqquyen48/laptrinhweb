document.addEventListener("DOMContentLoaded", () => {
    const categoryLinks = document.querySelectorAll(".category__link");
    const products = document.querySelectorAll(".popular__card");
  
    categoryLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Remove active class from all links
        categoryLinks.forEach((l) => l.classList.remove("active"));
        // Add active class to clicked link
        link.classList.add("active");
  
        const selectedCategory = link.getAttribute("data-category");
  
        // Show/hide products based on category
        products.forEach((product) => {
          const productCategory = product.getAttribute("data-category");
          if (selectedCategory === "all" || productCategory === selectedCategory) {
            product.style.display = "block";
          } else {
            product.style.display = "none";
          }
        });
      });
    });
  
    // Optionally, show all products by default
    products.forEach((product) => (product.style.display = "block"));
  });