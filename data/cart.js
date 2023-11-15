export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];

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
                      quantity: (Number) (itemQuantity)
                  }
              );
          }
  }

  export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
  }