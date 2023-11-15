import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
let cartSummaryHTML = '';
cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let  matchingItems;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingItems = product;
        }
    });
    console.log(matchingItems);
    cartSummaryHTML+=
    `
    <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItems.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingItems.name}
                </div>
                <div class="product-price">
                &#x20B9;${matchingItems.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingItems.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItems.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItems.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    &#x20B9;50 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItems.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    &#x20B9;100 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-quantity-link').forEach((event)=>{
      event.addEventListener('click',()=>{
        const productId = event.dataset.productId;
        removeFromCart(productId);
      });
    })
});