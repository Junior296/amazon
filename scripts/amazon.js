// Initialize an empty cart or retrieve it from local storage
//let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Reference to the products container
const container = document.querySelector('.products-grid');

// Function to save the cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load products into the container
function loadProducts() {
    container.innerHTML = ''; // Clear the container

    for (const product of products) {
        const html = `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image" src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${(product.priceCents / 100).toFixed(2)}
                </div>

                <div class="product-quantity-container">
                    <select>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart" style="display: none;">
                    <img src="images/icons/checkmark.png"> Added
                </div>

                <button class="add-to-cart-button button-primary" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;

        container.innerHTML += html;
    }

    // Add event listeners after products are loaded
    addEventListeners();
}
  
  // Select the search bar and the products grid container
  const searchBar = document.querySelector('.search-bar');
  const productsGrid = document.querySelector('.products-grid');
  
  // Function to display products
  function displayProducts(filteredProducts) {
    productsGrid.innerHTML = ''; // Clear the grid first
  
    filteredProducts.forEach(product => {
      const productHTML =  `
      <div class="product-container">
          <div class="product-image-container">
              <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
              ${product.name}
          </div>

          <div class="product-rating-container">
              <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                  ${product.rating.count}
              </div>
          </div>

          <div class="product-price">
              $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
              <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
              </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" style="display: none;">
              <img src="images/icons/checkmark.png"> Added
          </div>

          <button class="add-to-cart-button button-primary" data-id="${product.id}">
              Add to Cart
          </button>
      </div>
  `;
      productsGrid.innerHTML += productHTML;
      addEventListeners()
    });
  }
  
  // Function to filter products based on search query
  function searchProducts(query) {
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
  }
  
  // Event listener for search input
  searchBar.addEventListener('input', (event) => {
    const query = event.target.value;
    searchProducts(query); // Call searchProducts with the current search query
  });
  
  // Initially display all products
  displayProducts(products);
  


// Function to add event listeners for "Add to Cart" buttons
function addEventListeners() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-button');

    addToCartBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            const product = products.find(p => p.id == productId);

            if (product) {
                // Find the quantity selected by the user
                const productContainer = button.closest('.product-container');
                const quantity = Number(productContainer.querySelector('select').value);

                // Check if product is already in the cart
                const existingProduct = cart.find(item => item.id == product.id);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.priceCents,
                        quantity: quantity,
                    });
                }

                // Save the updated cart to local storage
                saveCartToLocalStorage();

                // Show "Added to Cart" message
                const addedMessage = productContainer.querySelector('.added-to-cart');
                addedMessage.style.display = 'block';
                setTimeout(() => {
                    addedMessage.style.display = 'none';
                }, 2000);

                // Log the cart to the console for debugging
                console.log(cart);
            }
        });
    });
}

// Load cart from local storage on page load
function loadCartFromLocalStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart loaded from local storage:', cart);
}

// Load products on page load
loadCartFromLocalStorage();
loadProducts();
