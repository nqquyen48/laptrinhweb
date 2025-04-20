document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.querySelectorAll(".cart__item");
    const subtotalElement = document.querySelector(".subtotal");
    const totalElement = document.querySelector(".total__amount");
    const shippingFee = 30000; // Fixed shipping fee
  
    const updateTotal = () => {
      let subtotal = 0;
      cartItems.forEach((item) => {
        const priceText = item.querySelector(".cart__item__price").textContent.replace("₫", "").replace(/\./g, "");
        const price = parseInt(priceText);
        const quantity = parseInt(item.querySelector(".quantity__input").value);
        subtotal += price * quantity;
      });
  
      subtotalElement.textContent = `${subtotal.toLocaleString()}₫`;
      const total = subtotal + shippingFee;
      totalElement.textContent = `${total.toLocaleString()}₫`;
    };
  
    cartItems.forEach((item) => {
      const decreaseBtn = item.querySelector(".decrease");
      const increaseBtn = item.querySelector(".increase");
      const quantityInput = item.querySelector(".quantity__input");
      const removeBtn = item.querySelector(".cart__item__remove");
  
      decreaseBtn.addEventListener("click", () => {
        if (quantityInput.value > 1) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
          updateTotal();
        }
      });
  
      increaseBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateTotal();
      });
  
      quantityInput.addEventListener("input", () => {
        if (quantityInput.value < 1) quantityInput.value = 1;
        updateTotal();
      });
  
      removeBtn.addEventListener("click", () => {
        item.remove();
        updateTotal();
      });
    });
  
    updateTotal();
  });