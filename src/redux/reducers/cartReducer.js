import {
  ADD_TO_CART,
  DECREASE_CART_QUANTITY,
} from "../constants/cartConstants";
import { INCREASE_CART_QUANTITY } from "../constants/cartConstants";
// const cartInfoFromStorage = localStorage.getItem("cart")
// ? JSON.parse(localStorage.getItem("cart"))
// : [];

const initialState = { items: [] };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newProductArray = [...state.items];
      const index = newProductArray.findIndex(
        (product) => product.id === action.payload._id
      );
      if (index >= 0) {
        newProductArray[index].quantity = newProductArray[index].quantity + 1;
        newProductArray[index].price =
          newProductArray[index].price + action.payload.price;
      } else {
        newProductArray.push({
          id: action.payload._id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          image: action.payload.image,
          singleItemPrice: action.payload.price,
        });
      }

      return { ...state, items: newProductArray };

    case INCREASE_CART_QUANTITY:
      const newArr = [...state.items];
      const index1 = newArr.findIndex(
        (product) => product.id === action.payload
      );
      newArr[index1].quantity = newArr[index1].quantity + 1;
      newArr[index1].price =
        newArr[index1].price + newArr[index1].singleItemPrice;
      return { ...state, items: newArr };

    case DECREASE_CART_QUANTITY:
      const newArr1 = [...state.items];
      const index2 = newArr1.findIndex(
        (product) => product.id === action.payload
      );
      if (newArr1[index2].quantity > 0) {
        newArr1[index2].quantity = newArr1[index2].quantity - 1;
        newArr1[index2].price =
          newArr1[index2].price - newArr1[index2].singleItemPrice;
      }

      return { ...state, items: newArr1 };
    case "SAVE_TO_CART":
      console.log("save to cart is---", action.payload.items);
      return { ...state, items: action.payload.items };

    default:
      return initialState;
  }
};

// cartInfo:{
//     items
// }

// import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

// export const cartReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const item = action.payload;
//       const existItem= state.cartItems.find((x) => x.product === item.product);

//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }
//       case CART_REMOVE_ITEM:
//         return{
//           ...state,
//           cartItems:state.cartItems.filter(item=>item.product!==action.payload)
//         }
//     default:
//       return state;
//   }
// };
