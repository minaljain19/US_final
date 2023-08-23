import axios from "axios";
import {
  LOGIN,
  LOGOUT,
  ADDDATA,
  GET_USER_DATA,
  GET_CALL_DATA,
  GET_TWILIO_TOKEN
} from "../Components/Constant.js";
const initialData = {
  list: [],
  apidata: [],
  tokenData: [],
  error: [],
  status: [],
  userTypeLogin: [],
  tokenResponse: [],
  callData: [],
};

const user1 = (state = initialData, action) => {
  switch (action.type) {
    case GET_USER_DATA: {
      // console.log("action.payload", action.payload);
      return {
        ...state,
        apidata: action.payload,
      };
    }
    case GET_TWILIO_TOKEN:
      console.log(action.payload)
      return {
        ...state,
        tokenData: action.payload,
      };

    case GET_CALL_DATA: {
      console.log("action.payload", action.payload);
      return {
        ...state,
        callData: action.payload,
      };
    }

    case LOGOUT:
      console.log("logout");
      return {
        ...state,
        userTypeLogin: "",
      };

    case LOGIN:
      const { data1 } = action.payload;
      console.log("set h", data1);
      return {
        ...state,
        userTypeLogin: data1,
      };
    case ADDDATA:
      const { data } = action.payload;
      console.log("fdfddf", data);
      if (data?.errors) {
        console.log(data.message);
        return {
          ...state,
          error: data.message,
        };
      } else if (data?.keyValue?.mobile) {
        console.log("Mobile No already exist", data);
        return {
          ...state,
          error: "Mobile No already exist",
        };
      } else if (data?.keyValue?.email) {
        console.log("email already exist", data);
        return {
          ...state,
          error: "email already exist",
        };
      } else {
        console.log("success Fully post", data);
        return {
          ...state,
          status: "Success",
          error: "",
        };
      }

    default:
      return state;
  }
};
export default user1;
