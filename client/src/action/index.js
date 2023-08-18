import axios from "axios";
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
      console.log("res",res)
      dispatch({
        type: "LOGIN",
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
  console.log("allData", allData);
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
        type: "ADDDATA",
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
        type: "getUserData",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

