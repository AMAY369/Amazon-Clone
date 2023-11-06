export const cart = [];

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