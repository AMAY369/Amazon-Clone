import {cart,addToCart,calculateCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
let itemsHTML = '';
if(calculateCartQuantity()!==0){
  updateCartQuantity();
}
products.forEach((item)=>{
    itemsHTML +=
    `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
              &#x20B9;${item.price}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${item.id}">
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

          <div class="added-to-cart js-added-to-cart-${item.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${item.id}">
            Add to Cart
          </button>
        </div>
    `;
});
console.log(itemsHTML);
document.querySelector('.js-products-grid').innerHTML=itemsHTML;
let addToCartButton =document.querySelectorAll('.js-add-to-cart');

function updateCartQuantity(){
        document.querySelector('.js-cart-quantity').innerHTML=calculateCartQuantity();
}


addToCartButton.forEach((button)=>{
    button.addEventListener('click',()=>{
      const {productId} = button.dataset;
      let itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
      const messageElement = document.querySelector(`.js-added-to-cart-${productId}`);
      messageElement.classList.add('showMessage');
      setTimeout(() => {
        messageElement.classList.remove('showMessage');
      }, 2000);
        addToCart(productId,itemQuantity);
        updateCartQuantity();
    });
});