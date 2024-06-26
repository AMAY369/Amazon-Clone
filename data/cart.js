import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { deliveryOptions } from "./deliveryOptions.js";

export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity:2,
    deliveryOptionId: '1'
  },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId: '2'
  }];
}

export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId=== cartItem.productId){
      matchingItem = cartItem;
    }
    });

  if(matchingItem){
    matchingItem.quantity++;
  }else{
    cart.push({
      productId:productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();

}


export function removeFromCart(productId){
  let newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId=== cartItem.productId){
      matchingItem = cartItem;
    }
    });
  
  matchingItem.deliveryOptionId = deliveryOptionId;
  renderPaymentSummary();

  saveToStorage();
}