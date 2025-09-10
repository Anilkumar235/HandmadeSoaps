let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}
function updateCartCount() {
    const count = cart.length;
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    if (!cartItemsDiv) return;
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<span>${item.name} - ₹${item.price}</span><button onclick="removeItem(${index})">Remove</button>`;
        cartItemsDiv.appendChild(div);
        total += item.price;
    });
    document.getElementById('total-price').textContent = `Total: ₹${total}`;
    const checkoutDiv = document.getElementById('checkout-buttons');
    if (checkoutDiv) {
        checkoutDiv.innerHTML = `<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="youremail@paypal.com">
<input type="hidden" name="item_name" value="Cart Items">
<input type="hidden" name="amount" value="${total}">
<input type="hidden" name="currency_code" value="INR">
<input type="submit" value="Pay with PayPal" class="btn">
</form>`;
    }
}
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}
updateCartCount();
displayCart();