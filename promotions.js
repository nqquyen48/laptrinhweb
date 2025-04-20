document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add__to__cart__btn");
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".promotion__card");
        const productName = card.querySelector("h4").textContent;
        const productPrice = card.querySelector(".discounted__price").textContent;
        alert(`${productName} đã được thêm vào giỏ hàng với giá ${productPrice}!`);
        // In a real application, you'd add the item to the cart (e.g., using local storage or a backend API).
      });
    });
  });