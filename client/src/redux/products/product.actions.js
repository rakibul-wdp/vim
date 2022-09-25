import axios from 'axios';

import {
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
} from './product.type';
let API = 'https://dobby-yl84.onrender.com/getPost';
export const getProducts = (id, name) => async (dispatch, state) => {
  dispatch({ type: GET_PRODUCT_LOADING });
  try {
    const res = await axios.post(`${API}/${id}`, {
      name
    });
    console.log("action", res.data)
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data });
    return res.data
  } catch (er) {
    return dispatch({ type: GET_PRODUCT_ERROR });
  }
};
