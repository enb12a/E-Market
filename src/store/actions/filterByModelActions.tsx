
import { ADD_FILTER_MODEL, REMOVE_FILTER_MODEL } from "./types";

export const addToModelList = (product:any) => ({
  type: ADD_FILTER_MODEL,
  payload: product,
});

export const removeFromModelList = (productId:any) => ({
  type: REMOVE_FILTER_MODEL,
  payload: productId,
});
