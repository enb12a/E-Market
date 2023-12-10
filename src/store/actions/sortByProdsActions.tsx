import { TOGGLE_SORT_OPTION } from './types';

export const toggleSortOption = (id: any) => {
  return {
    type: TOGGLE_SORT_OPTION,
    payload: id,
  };
};