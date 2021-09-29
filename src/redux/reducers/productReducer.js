import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../constants/productConstants";

const productInfoFromStorage = localStorage.getItem("myProducts")
? JSON.parse(localStorage.getItem("myProducts"))
: [];

const initialState = {products:productInfoFromStorage,loading:false,error:null}

export const productReducer = (state=initialState,action) =>{
    switch (action.type) {
        case PRODUCT_REQUEST:
            
            return {...state,loading:true}
        case PRODUCT_SUCCESS:

            return {...state,loading:false,products:action.payload}
            
        case PRODUCT_FAIL:
            return {...state,loading:false,products:null,error:action.paylaod}
         
        case PRODUCT_DELETE_REQUEST:
            return {...state,loading:true}   
        
        case PRODUCT_DELETE_SUCCESS:
            return {...state,loading:false} 
            
        case PRODUCT_DELETE_FAIL:
            return {...state,loading:false,error:action.paylaod}

           
           
        default:
           {
               return {...state}
            }
    }

}