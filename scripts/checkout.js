import { calculateCartQuantity, cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption } from "../data/deliveryOptions.js";
const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd,MMMM D'));


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
    <div class="cart-item-container js-cart-item-container-${matchingItems.id}">
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
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItems.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id= ${matchingItems.id}>
                    Update
                  </span>
                  <input class = "quantity-input js-quantity-input">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id ="${matchingItems.id}">
                  save
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
    `;

    function deliveryOptionsHTML(){
      let HTML ='';
      deliveryOption.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.price===0? "FREE":deliveryOption.price;

        HTML+=
        `
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItems.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
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
            ${dateString}
          </div>
          <div class="delivery-option-price">
          &#x20B9;${priceString} - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingItems.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
          &#x20B9;${priceString} - Shipping
          </div>
        </div>
      </div>
        `
      });
      return HTML;
    }

    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

    function updateCartQuantity(){
            document.querySelector('.js-return-to-home-link').innerHTML=calculateCartQuantity();
    }
    updateCartQuantity();
    document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCartQuantity();
      });
    })

    document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        console.log(productId);
        const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        itemContainer.classList.add('is-editing-quantity');
      });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');


        let newQuantity = (Number)(document.querySelector('.js-quantity-input').value);
        updateQuantity(productId,newQuantity);

        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity;
        updateCartQuantity();
      });
    });
});