// sortReducer.js
import { TOGGLE_SORT_OPTION } from '../actions/types';

const initialState = [
  { id: 1, value: true, name: 'Old to new', selected: false },
  { id: 2, value: false, name: 'New to old', selected: false },
  { id: 3, value: false, name: 'Price high to low', selected: false },
  { id: 4, value: false, name: 'Price low to high', selected: false },
];

const sortReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_SORT_OPTION:
      return state.map((option) =>
        option.id === action.payload
          ? { ...option, selected: true }
          : { ...option, selected: false }
      );
    default:
      return state;
  }
};

export default sortReducer;
