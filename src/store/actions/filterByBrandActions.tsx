import {ADD_BRAND_OPTION,REMOVE_BRAND_OPTION} from './types'

export const addToBrandList = (product:any) => ({
  type: ADD_BRAND_OPTION,
  payload: product,
});

export const removeFromBrandList = (productId:any) => ({
  type: REMOVE_BRAND_OPTION,
  payload: productId,
});