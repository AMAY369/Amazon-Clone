import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import '../data/cart-class.js';
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js'
// import '../data/backend-practice.js'
      
async function loadPage(){
  try {
    // throw('custom error');
    console.log("Load Page");
    await loadProductsFetch();
    await new Promise((resolve)=>{
      loadCart(()=>{
        resolve()
      });
    });

  } catch (error) {
    console.log(`Failed to load products or cart ${error}`)
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();


// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     });
//   })
// ]).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve();
//   });
// }).then(()=>{
//   return new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     });
//   });
// }).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// })

// loadProducts(()=>{
//   loadCart(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });

