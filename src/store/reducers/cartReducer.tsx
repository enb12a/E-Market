
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
      case REMOVE_FROM_CART:
        const indexToRemove = state.cartItems.findIndex((item:any) => item.id === action.payload);
      
        if (indexToRemove !== -1) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems.splice(indexToRemove, 1);
      
          return {
            ...state,
            cartItems: updatedCartItems,
          };
        }
    default:
      return state;
  }
};

export default cartReducer;
