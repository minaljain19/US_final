import axios from "axios";
import {
  LOGIN,
  LOGOUT,
  ADDDATA,
  GET_USER_DATA,
  GET_CALL_DATA,
  GET_TWILIO_TOKEN
} from "../Components/Constant.js";
export const userLogout = () => {
  return { type: LOGOUT };
};
export const userLogin = (loginData) => {
  console.log("loginData", loginData);
  const email = loginData.email1;
  const password = loginData.password1;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const loginSendData = await fetch("http://localhost:5000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await loginSendData.json();
      console.log("res", res);
      dispatch({
        type: LOGIN,
        payload: {
          data1: [res],
        },
      });
    } catch (error) {
      console.log("login hello", error);
    }
  };
};
export const userRegis = (allData) => {
  const username = allData.username;
  const email = allData.email;
  const mobile = allData.mobile;
  const password = allData.password;

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const apiSendData = await fetch("http://localhost:5000/user", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          mobile,
          email,
          password,
        }),
      });
      const res = await apiSendData.json();
      dispatch({
        type: ADDDATA,
        payload: {
          data: res,
        },
      });
    } catch (error) {
      console.log("hello", error);
    }
  };
};

export const getData = () => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/user`, config);

      dispatch({
        type: GET_USER_DATA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getTokens = () => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get-twilio-token`, config);
      console.log("toeknn",response.data.token)
      dispatch({
        type: GET_TWILIO_TOKEN,
        payload: response.data.token,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCallData = () => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const ress = await axios.get(`http://localhost:5000/callHistory`, config);
      console.log(ress.data);
      dispatch({
        type: GET_CALL_DATA,
        payload: ress.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
