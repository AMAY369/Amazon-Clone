export function getDeliveryOption(deliveryOptionId){
  let deliveryOpt;
  deliveryOptions.forEach((deliveryOption)=>{
    if(deliveryOption.id===deliveryOptionId){
      deliveryOpt = deliveryOption;
    }
  });
  return deliveryOpt;
}

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  price: 0
},
{
  id: '2',
  deliveryDays: 3,
  price: 50
},
{
  id: '3',
  deliveryDays: 1,
  price: 100
}]