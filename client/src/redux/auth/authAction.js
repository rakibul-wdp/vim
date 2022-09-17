import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGOUT
} from './authType';

let API = 'https://dobby-yl84.onrender.com';
export const registerUser = (creds) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/signup`, creds);
    const data = await res.data;


    return dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    return dispatch({ type: AUTH_ERROR });
  }
};

export const loginUser = (creds) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/login`, creds);
    const data = await res.data;
    console.log(data)
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    return dispatch({ type: AUTH_ERROR });
  }
};

export const handleLogout = () => {
  console.log("ok")

  dispatch({ type: AUTH_LOGOUT })
}
