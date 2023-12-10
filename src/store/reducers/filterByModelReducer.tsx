
import { ADD_FILTER_MODEL, REMOVE_FILTER_MODEL } from "../actions/types";

const initialState = {
    modelList: [],
};

const FilterModelReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case ADD_FILTER_MODEL:
            const newItem = action.payload;
      
            // Check if the item already exists in favItems
            const itemExists = state.modelList.some((item:any) => item.id === newItem.id);
      
            if (!itemExists) {
              // Add the item to favItems only if it doesn't exist
              return {
                ...state,
                modelList: [...state.modelList, newItem],
              };
            }
      
            // If the item already exists, return the current state
            return state;
        case REMOVE_FILTER_MODEL:
            const indexToRemove = state.modelList.findIndex((item: any) => item.id === action.payload);
            if (indexToRemove !== -1) {
                const updatedCartItems = [...state.modelList];
                updatedCartItems.splice(indexToRemove, 1);
                return {
                    ...state,
                    modelList: updatedCartItems,
                };
            }
        default:
            return state;
    }
};

export default FilterModelReducer;
