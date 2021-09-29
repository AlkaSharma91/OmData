import { ADD_TO_CART, DECREASE_CART_QUANTITY, INCREASE_CART_QUANTITY } from "../constants/cartConstants"


export const addToCart = (product) =>async dispatch =>{

  dispatch({
      type:ADD_TO_CART,
      payload:product
  })

}

export const increateQuantity=(id)=>async dispatch=>{
  dispatch({
      type:INCREASE_CART_QUANTITY,
      payload:id
  })

}

export const decreaseQuantity=(id)=>async dispatch=>{
    dispatch({
        type:DECREASE_CART_QUANTITY,
        payload:id
    })
  
  }

export const saveCart=(items)=>async dispatch=>{
  dispatch({
    type:'SAVE_TO_CART',
    payload:items
  })
}  

 
