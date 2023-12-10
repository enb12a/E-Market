import axios from "axios";
import { PRODUCTSLISTSUCCESS,PRODUCTSLOADING,PRODUCTSTFAILED } from "./types";
const productsFailed = (data:any) => ({type: PRODUCTSTFAILED, payload: data});
const productsLoading = () => ({type: PRODUCTSLOADING,});
const productsListSuccess = (data:any) => ({type: PRODUCTSLISTSUCCESS, payload: data});

export function getAllProducts(){
    return function(dispatch:any){
        dispatch(productsLoading());
        axios({
            method:"get",
            url:"https://5fc9346b2af77700165ae514.mockapi.io/products"
        }).then((res:any)=>{
            dispatch(productsListSuccess(res.data))
        }).catch((err:any)=>{
            dispatch(productsFailed(err))
        })

    }
}