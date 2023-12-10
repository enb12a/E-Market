
import { ADD_TO_FAV, REMOVE_FROM_FAV } from "../actions/types";

const initialState = {
    favItems: [],
};

const favReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case ADD_TO_FAV:
            const newItem = action.payload;
      
            // Check if the item already exists in favItems
            const itemExists = state.favItems.some((item:any) => item.id === newItem.id);
      
            if (!itemExists) {
              // Add the item to favItems only if it doesn't exist
              return {
                ...state,
                favItems: [...state.favItems, newItem],
              };
            }
      
            // If the item already exists, return the current state
            return state;
        case REMOVE_FROM_FAV:
            const indexToRemove = state.favItems.findIndex((item: any) => item.id === action.payload);
            if (indexToRemove !== -1) {
                const updatedCartItems = [...state.favItems];
                updatedCartItems.splice(indexToRemove, 1);
         

                return {
                    ...state,
                    favItems: updatedCartItems,
                };
            }
        default:
            return state;
    }
};

export default favReducer;
