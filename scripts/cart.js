// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const totalItems = document.querySelector('.return-to-home-link')
totalItems.innerHTML = cart.length;

// Select the container for cart items

// Function to render cart items
function renderCartItems() {
    orderSummaryContainer.innerHTML = ''; // Clear existing items
    cart.forEach((item, index) => {
        const itemHTML = `
        <div class="cart-item-container">
            <div class="delivery-date">Delivery date: ${item.deliveryDate || 'Not set'}</div>
            <div class="cart-item-details-grid">
                <img class="product-image" src="${item.image}">
                <div class="cart-item-details">
                    <div class="product-name">${item.name}</div>
                    <div class="product-price">$${(item.price / 100).toFixed(2)}</div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary" data-index="${index}">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary" data-index="${index}">
                            Delete
                        </span>
                    </div>
                </div>
            </div>
        </div>`;
        orderSummaryContainer.innerHTML += itemHTML;
    });

    // Recalculate totals after rendering items
    calculateTotals();
}

// Function to calculate totals
function calculateTotals() {

    let itemsTotal = 0;
    const shipping = 4.99; // Example flat rate shipping

    cart.forEach(item => {
        itemsTotal += (item.price * item.quantity) / 100;
    });

    const tax = itemsTotal * 0.1; // Assuming 10% tax
    const orderTotal = itemsTotal + shipping + tax;

    // Update the payment summary in the DOM
    const paymentSummaryElements = document.querySelectorAll('.payment-summary-money');
    paymentSummaryElements[0].textContent = `$${itemsTotal.toFixed(2)}`;
    paymentSummaryElements[1].textContent = `$${shipping.toFixed(2)}`;
    paymentSummaryElements[2].textContent = `$${(itemsTotal + shipping).toFixed(2)}`;
    paymentSummaryElements[3].textContent = `$${tax.toFixed(2)}`;
    paymentSummaryElements[4].textContent = `$${orderTotal.toFixed(2)}`;
    document.querySelector('.total-items').innerHTML += `(${cart.length}):`;
}

// Event listener for "Update" quantity
const orderSummaryContainer = document.querySelector('.order-summary');
orderSummaryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('update-quantity-link')) {
        const index = e.target.dataset.index;
        const newQuantity = prompt('Enter new quantity:', cart[index].quantity);

        if (newQuantity && newQuantity > 0) {
            cart[index].quantity = parseInt(newQuantity, 10);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    }
});

// Event listener for "Delete" item
orderSummaryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-quantity-link')) {
        const index = e.target.dataset.index;

        // Confirm deletion
        if (confirm('Are you sure you want to delete this item?')) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    }
});

// Render the cart items on page load
renderCartItems();
