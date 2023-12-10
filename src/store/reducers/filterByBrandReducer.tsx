
import { ADD_BRAND_OPTION, REMOVE_BRAND_OPTION } from "../actions/types";

const initialState = {
    brandList: [],
};

const FilterBrandReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case ADD_BRAND_OPTION:
            const newItem = action.payload;
      
            // Check if the item already exists in favItems
            const itemExists = state.brandList.some((item:any) => item.id === newItem.id);
      
            if (!itemExists) {
              // Add the item to favItems only if it doesn't exist
              return {
                ...state,
                brandList: [...state.brandList, newItem],
              };
            }
      
            // If the item already exists, return the current state
            return state;
        case REMOVE_BRAND_OPTION:
            const indexToRemove = state.brandList.findIndex((item: any) => item.id === action.payload);
            if (indexToRemove !== -1) {
                const updatedCartItems = [...state.brandList];
                updatedCartItems.splice(indexToRemove, 1);
                return {
                    ...state,
                    brandList: updatedCartItems,
                };
            }
        default:
            return state;
    }
};

export default FilterBrandReducer;
