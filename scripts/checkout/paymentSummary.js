import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrders } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";

export function renderPaymentSummary(){
  let productPrice = 0;
  let shippingCharges = 0;
  cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);
    productPrice+= product.price*cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingCharges+= deliveryOption.price;
  });
  const amountBeforeTax = productPrice+shippingCharges;
  const tax = Math.round(amountBeforeTax*10/100);
  const amountAfterTax = amountBeforeTax+tax;

  const paymentSummaryHTML =
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">&#8377;${productPrice}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">&#8377;${shippingCharges}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">&#8377;${amountBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">&#8377;${tax}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">&#8377;${amountAfterTax}</div>
    </div>

    <button class="place-order-button js-place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order-button').addEventListener('click', async ()=>{
    try{
      const response = await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      response.json().then((order)=>{
        addOrders(order);
      })

    }catch(error){
      console.log(`Failed to respond!!! ${error}`);
    }

    window.location.href = 'orders.html';
  });
}