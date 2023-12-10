
import { ADD_TO_FAV, REMOVE_FROM_FAV } from "./types";

export const addToFav = (product:any) => ({
  type: ADD_TO_FAV,
  payload: product,
});

export const removeFromFav = (productId:any) => ({
  type: REMOVE_FROM_FAV,
  payload: productId,
});
