function increase(qunatity) {
  return qunatity + 1;
}
function decrease(qunatity) {
  return qunatity - 1;
}
const initialState = [];
const CartReduser = (state = [], action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      let data = action.payload;
      const tempProduct = {
        productID: data._id,
        name: data.name,
        img: data.img,
        description: data.description,
        price: data.price,
        category: data.category,
        cartQuantity: 1,
      };
      return state.concat(tempProduct);
    case "ADD":
      const objIndex = state.findIndex(
        (obj) => obj.productID === action.payload
      );
      state[objIndex].cartQuantity = increase(state[objIndex].cartQuantity);
      return state;
    case "SUB":
      const objInde = state.findIndex(
        (obj) => obj.productID === action.payload
      );
      state[objInde].cartQuantity = decrease(state[objInde].cartQuantity);
      return state;
    case "REMOVE_PRODUCT_FROM_CART":
      return state.filter((e) => e?.productID !== action?.payload);
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};
export default CartReduser;

// case 'ADD_PRODUCT_TO_CART':
//     return state.map((d)=> {
//         if(action.payload.productID !== state.productID){
//             return state.concat(action.payload)
//         } else if (state.length == 0 ){

//             return action.payload;
//         }
//         else {

//         }
//     })
