import { getProduct, products } from "../../data/products.js";
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){

  let cartSummaryHTML ='';

  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const today = dayjs();
    const deliveryOpt = getDeliveryOption(deliveryOptionId);
    const deliveryDate = today.add(deliveryOpt.deliveryDays, 'days');
    const deliveryDateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML+=
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${deliveryDateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
        &#8377;${matchingProduct.price}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
    `
  });

  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html= '';
    const today = dayjs();

    deliveryOptions.forEach((deliveryOption)=>{
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const deliveryDateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.price===0? 'FREE': `&#8377;${deliveryOption.price}`
      const isChecked = deliveryOption.id===cartItem.deliveryOptionId? 'checked': '';

      html+=
      `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" class="delivery-option-input"
        ${isChecked}
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${deliveryDateString}
        </div>
        <div class="delivery-option-price">
        ${priceString} - Shipping
        </div>
      </div>
    </div>
      `
    });
    return html;
  }



  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      removeFromCart(productId);

      document.querySelector(`.js-cart-item-container-${productId}`).remove();

      renderPaymentSummary();

    });
  });


  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
    })
  })
}
renderOrderSummary()
