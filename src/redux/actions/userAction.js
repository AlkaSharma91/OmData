import axios from "axios";
import { PRODUCT_FAIL, PRODUCT_REQUEST } from "../constants/productConstants";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const register =
  (name, email, address, phone, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        header: {
          "content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/",
        { name, email, address, phone, password },
        config
      );
      console.log("data is", data);

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (errors) {
      console.log("error in user action is", errors);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: errors,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password },
      config
    );
    console.log("data is ", data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // history.push('/');
    localStorage.setItem("myToken", JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const profile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });
    const token = JSON.parse(localStorage.getItem("myToken"));

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/users/profile`,
      config
    );

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const update =
  (id, name, email, address, phone, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });

     // const userData = JSON.parse(localStorage.getItem("userData"));

      const token = JSON.parse(localStorage.getItem("myToken"));

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      };

      const { data } = await axios.patch(
        `http://localhost:5000/update/${id}`,
        { name, email, address, phone, password },
        config
      );
      console.log("updated data in action", data);
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });

      if (localStorage.getItem("userData")) {
        localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  // localStorage.removeItem("userInfo");
  if (localStorage.getItem("userData")) {
    localStorage.removeItem("userData");
  }
  if (localStorage.getItem("myToken")) {
    localStorage.removeItem("myToken");
  }
  if (localStorage.getItem("myProducts")) {
    localStorage.removeItem("myProducts");
  }
  if (localStorage.getItem("cart")) {
    localStorage.removeItem("cart");
  }
  dispatch({ type: USER_LOGOUT });
  dispatch({
    type: PRODUCT_FAIL,
    payload: "error",
  });
};
