import axios from "axios";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADDDATA = "ADDDATA";
const GET_USER_DATA = "getUserData";
const GET_CALL_DATA = "getCallData";
const UPDATEPASS = "UPDATEPASS";
const RESETPASS = "RESETPASS";
const RESET = "RESET";
const GET_CONTACT_DATA = "GET_CONTACT_DATA";
const GET_CONTACT_DATA1 = "GET_CONTACT_DATA1";
const ADDCONTACT = "ADDCONTACT";
const BACK = "BACK";
const DELETEUSER = "DELETEUSER";
const GET_CALL_LENGTH = "GET_CALL_LENGTH";
const GET_CALL_FILTER_DATA = "GET_CALL_FILTER_DATA";
const SETDATA = "SETDATA";

export const userLogout = () => {
  return { type: LOGOUT };
};

export const setError = () => {
  return { type: SETDATA };
};

export const filterByDate = (data) => {
  const { user_id, callTime, currentPage, rowNum } = data;

  return async (dispatch) => {
    try {
      const ress = await axios.get(
        `http://localhost:5000/callHistory?user_id=${user_id}&callTime=${callTime}&page=${currentPage}&pageSize=${rowNum}`
      );
      const res2 = await axios.get(
        `http://localhost:5000/callHistoryLen?user_id=${user_id}&callTime=${callTime}`
      );

      const payload = {
        response1: ress.data,
        response2: res2.data.length,
      };

      dispatch({
        type: GET_CALL_FILTER_DATA,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterByNumberAndDate = (data) => {
  const { user_id, to, callTime, currentPage, rowNum } = data;

  return async (dispatch) => {
    try {
      const ress = await axios.get(
        `http://localhost:5000/callHistory?user_id=${user_id}&to=${to}&callTime=${callTime}&page=${currentPage}&pageSize=${rowNum}`
      );

      const res2 = await axios.get(
        `http://localhost:5000/callHistoryLen?user_id=${user_id}&callTime=${callTime}&to=${to}`
      );

      const payload = {
        response1: ress.data,
        response2: res2.data.length,
      };

      dispatch({
        type: GET_CALL_FILTER_DATA,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteContactDetail = (event) => {
  const _id = event;

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const resetSendData = await fetch("http://localhost:5000/deleteById", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
        }),
      });
      const res = await resetSendData.json();

      dispatch({
        type: DELETEUSER,
        payload: {
          data1: [res],
        },
      });
    } catch (error) {
      console.log("reset hello", error);
    }
  };
};

export const setNoRecord = (data) => {
  return async (dispatch) => {
    try {
      const payload = {
        response1: [],
        response2: 0,
      };
      dispatch({
        type: GET_CALL_FILTER_DATA,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getCallHisdataByDateAndName = (data) => {
  const { user_id, callToInNewList, callTime, currentPage } = data;

  return async (dispatch) => {
    try {
      const allD = [];
      const allD1 = [];
      for (let i = 0; i < callToInNewList.length; i++) {
        const ress = await axios.get(
          `http://localhost:5000/callHistory?user_id=${user_id}&to=${callToInNewList[i]}&callTime=${callTime}&page=${currentPage}`
        );

        if (ress.data.length > 0) {
          allD.push(ress.data);
        }
      }
      for (let i = 0; i < callToInNewList.length; i++) {
        const ress = await axios.get(
          `http://localhost:5000/callHistoryLen?user_id=${user_id}&to=${callToInNewList[i]}&callTime=${callTime}`
        );

        if (ress.data.length > 0) {
          allD1.push(ress.data);
        }
      }
      const payload = {
        response1: allD.length > 0 ? allD[0] : allD,
        response2: allD1.length > 0 ? allD1[0].length : 0,
      };

      dispatch({
        type: GET_CALL_FILTER_DATA,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getCallHisdata = (data) => {
  const { user_id, callToInNewList, currentPage, rowNum } = data;
  return async (dispatch) => {
    try {
      const allD = [];
      const allD1 = [];
      for (let i = 0; i < callToInNewList.length; i++) {
        const ress = await axios.get(
          `http://localhost:5000/callHistory?user_id=${user_id}&to=${callToInNewList[i]}&page=${currentPage}&pageSize=${rowNum}`
        );

        if (ress.data.length > 0) {
          allD.push(ress.data);
        }
      }

      for (let i = 0; i < callToInNewList.length; i++) {
        const ress = await axios.get(
          `http://localhost:5000/callHistoryLen?user_id=${user_id}&to=${callToInNewList[i]}`
        );

        if (ress.data.length > 0) {
          allD1.push(ress.data);
        }
      }

      const payload = {
        response1: allD.length > 0 ? allD[0] : allD,
        response2: allD1.length > 0 ? allD1[0].length : 0,
      };

      dispatch({
        type: GET_CALL_FILTER_DATA,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const filterByNumber = (data) => {
  const { user_id, to, currentPage, rowNum } = data;

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const ress = await axios.get(
        `http://localhost:5000/callHistory?user_id=${user_id}&to=${to}&page=${currentPage}&pageSize=${rowNum}`,
        config
      );

      const res2 = await axios.get(
        `http://localhost:5000/callHistoryLen?user_id=${user_id}&to=${to}`
      );

      const payload = {
        response1: ress.data,
        response2: res2.data.length,
      };

      dispatch({
        type: GET_CALL_FILTER_DATA,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterContactApiDataByNo = (data) => {
  const { contactNo, user_id } = data;

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/contactList?userId=${user_id}&contactNo=${contactNo}`,
        config
      );

      dispatch({
        type: GET_CONTACT_DATA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const filterContactApiData = (data) => {
  const { contactName, user_id } = data;

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/contactList?userId=${user_id}&contactName=${contactName}`,
        config
      );

      dispatch({
        type: GET_CONTACT_DATA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const userUpdatePass = (allData) => {
  const email = allData.fEmail;
  const password = allData.fPass;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const resetSendData = await fetch(
        "http://localhost:5000/UpdatePassword",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const res = await resetSendData.json();
      dispatch({
        type: RESETPASS,
        payload: {
          data1: [res],
        },
      });
    } catch (error) {
      console.log("reset hello", error);
    }
  };
};
export const updateUserProfileSection = (allData) => {
  const _id = allData._id;
  const email = allData.email;
  const username = allData.userName;
  const mobile = allData.mobileNo;
  const password = allData.password;
  return async (dispatch) => {
    try {
      const resetSendData = await fetch("http://localhost:5000/updateUser", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          username,
          mobile,
          email,
          password,
        }),
      });
      const res = await resetSendData.json();
      dispatch({
        type: UPDATEPASS,
        payload: {
          data1: [res],
        },
      });
    } catch (error) {
      console.log("reset hello", error);
    }
  };
};
export const goLoginn = () => {
  return { type: BACK };
};
export const resetPassword = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/user`);

      const emailChk = res.data.some((user) => user.email === data);

      dispatch({
        type: RESET,
        payload: {
          data1: emailChk ? "True" : "False",
        },
      });
    } catch (error) {
      console.log("reset hello", error);
    }
  };
};
export const userLogin = (loginData) => {
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

export const getAllContactData = () => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/contactList`, config);

      dispatch({
        type: GET_CONTACT_DATA1,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
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

export const getCallLength = (user_id) => {
  const uid = user_id;

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const ress = await axios.get(
        `http://localhost:5000/callHistoryLen?user_id=${uid}`,
        config
      );

      dispatch({
        type: GET_CALL_LENGTH,
        payload: ress.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getCallData = (data) => {
  const page = data.currentPage;
  const uid = data.uid;
  const pageSize = data.rowNum;

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const ress = await axios.get(
        `http://localhost:5000/callHistory?page=${page}&user_id=${uid}&pageSize=${pageSize}`,
        config
      );

      dispatch({
        type: GET_CALL_DATA,
        payload: ress.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const contactRegisEdit = (allData) => {
  const contactName = allData.contactName;
  const contactNo = allData.contactNo;
  const userId = allData.userId;
  const _id = allData.event;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const apiSendData = await fetch("http://localhost:5000/contactListEdit", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactName,
          contactNo,
          userId,
          _id,
        }),
      });
      const res = await apiSendData.json();
      dispatch({
        type: ADDCONTACT,
        payload: {
          dataC: res,
        },
      });
    } catch (error) {
      console.log("hello contact", error);
    }
  };
};
export const contactRegis = (allData) => {
  const contactName = allData.contactName;
  const contactNo = allData.contactNo;
  const userId = allData.userId;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const apiSendData = await fetch("http://localhost:5000/contactList", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactName,
          contactNo,
          userId,
        }),
      });
      const res = await apiSendData.json();
      dispatch({
        type: ADDCONTACT,
        payload: {
          dataC: res,
        },
      });
    } catch (error) {
      console.log("hello contact", error);
    }
  };
};

export const getContactDetail = () => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/contactList`, config);

      dispatch({
        type: GET_CONTACT_DATA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
