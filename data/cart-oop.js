import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

function Cart(localStorageKey){
  const cart = {
    cartItems: undefined,

    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
        productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        quantity:2,
        deliveryOptionId: '1'
      },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId: '2'
      }];
    },

    addToCart(productId){
      let matchingItem;
      this.cartItems.forEach((cartItem)=>{
        if(productId=== cartItem.productId){
          matchingItem = cartItem;
        }
        });
      if(matchingItem){
        matchingItem.quantity++;
      }else{
        this.cartItems.push({
          productId:productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },

    removeFromCart(productId){
      let newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },

    saveToStorage(){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },

    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
      this.cartItems.forEach((cartItem)=>{
        if(productId=== cartItem.productId){
          matchingItem = cartItem;
        }
        });
      matchingItem.deliveryOptionId = deliveryOptionId;
      renderPaymentSummary();
      this.saveToStorage();
    }

  }
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('businessCart-oop');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);














