export let cart = JSON.parse(localStorage.getItem('cart'))
||
    [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryOptionId:'1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId:'2'
        }
    ];



function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


export function calculateCartQuantity(){
    let cartQuantity=0;
        cart.forEach((item) => {
            cartQuantity += (Number)(item.quantity);
        });
        return (Number)(cartQuantity);
}

export function addToCart(productId, itemQuantity){
    let matchingItems;
          cart.forEach((product)=> {
              if(productId===product.productId){
                  matchingItems = product;
              }
          });
          if(matchingItems){
              matchingItems.quantity+=(Number)(itemQuantity);
          }
          else{
              cart.push(
                  {
                      productId: productId,
                      quantity: (Number) (itemQuantity),
                      deliveryOptionId:'1'
                  }
              );
          }
          saveToStorage();
  }

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
  }

export function updateQuantity(productId, newQuantity){
    cart.forEach((item)=>{
        if(item.productId === productId){
            item.quantity = newQuantity;
        }
        saveToStorage();
    });
}