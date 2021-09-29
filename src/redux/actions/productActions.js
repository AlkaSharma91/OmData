import axios from "axios";
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const addProduct =
  (data ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_REQUEST,
      });

      const token = JSON.parse(localStorage.getItem("myToken"));
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        data,
        config
      );

      dispatch({
        type: PRODUCT_SUCCESS,
        payload: response.data.product,
      });
      localStorage.setItem("myProducts", JSON.stringify(response.data.product));
    } catch (error) {
      dispatch({
        type: PRODUCT_REQUEST,
        payload: error,
      });
    }
  };

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("myToken"));
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await axios.get(
      "http://localhost:5000/api/products",
      config
    );

    dispatch({
      type: PRODUCT_SUCCESS,
      payload: result.data.products,
    });

    localStorage.setItem("myProducts", JSON.stringify(result.data.products));
  } catch (error) {
    dispatch({
      type: PRODUCT_REQUEST,
      payload: error,
    });
  }
};

export const deleteProductWithID=(id)=>async(dispatch)=>{
  try {

    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("myToken"));
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

     const result=await axios.delete(`http://localhost:5000/api/products/delete/${id}`,config)
     console.log(result);
     if(result.data.status===200){
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload:result
      });

      

     }
     



    
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:error
    });
    
  }
}
