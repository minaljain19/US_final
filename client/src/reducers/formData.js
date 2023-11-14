const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADDDATA = "ADDDATA";
const GET_USER_DATA = "getUserData";
const GET_CALL_DATA = "getCallData";
const GET_TWILIO_TOKEN = "getTwilioToken";
const UPDATEPASS = "UPDATEPASS";
const RESETPASS = "RESETPASS";
const RESET = "RESET";
const GET_CONTACT_DATA = "GET_CONTACT_DATA";
const GET_CONTACT_DATA1 = "GET_CONTACT_DATA1";
const ADDCONTACT = "ADDCONTACT";
const BACK = "BACK";
const DELETEUSER = "DELETEUSER";
const SETDATA = "SETDATA";
const GET_CALL_LENGTH = "GET_CALL_LENGTH";
const GET_CALL_FILTER_DATA = "GET_CALL_FILTER_DATA";
const initialData = {
  list: [],
  apidata: [],
  tokenData: [],
  deleteUser: [],
  error: [],
  status: [],
  resetData: [],
  userTypeLogin: [],
  updateData: [],
  tokenResponse: [],
  contactData: [],
  callData: [],
  reset: [],
  contactStatus: [],
};

const user1 = (state = initialData, action) => {
  switch (action.type) {
    case GET_USER_DATA: {
      return {
        ...state,
        apidata: action.payload,
      };
    }
    case GET_TWILIO_TOKEN:
      return {
        ...state,
        tokenData: action.payload,
      };
    case UPDATEPASS:
      return {
        ...state,
        updateData: action.payload.data1,
        userTypeLogin: action.payload.data1,
      };
    case BACK:
      return {
        ...state,
        resetData: [],
        reset: [],
      };
    case RESETPASS:
      return {
        ...state,
        resetData: action.payload.data1,
        reset: [],
      };
    case RESET:
      return {
        ...state,
        reset: action.payload.data1,
        resetData: [],
      };

    case GET_CONTACT_DATA:
      return {
        ...state,
        contactData: action.payload,
      };
    case GET_CONTACT_DATA1:
      return {
        ...state,
        contactDatas: action.payload,
      };
    case GET_CALL_LENGTH:
      console.log("len", action.payload);
      return {
        ...state,
        callDataLength: action.payload,
      };
    case GET_CALL_FILTER_DATA:
      return {
        ...state,
        callData: action.payload.response1,
        callDataLength: action.payload.response2,
      };
    case GET_CALL_DATA:
      return {
        ...state,
        callData: action.payload,
      };

    case DELETEUSER:
      return {
        ...state,
        deleteUser: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        userTypeLogin: "",
        callDataLength: "",
        callData: [],
      };

    case LOGIN:
      const { data1 } = action.payload;

      return {
        ...state,
        userTypeLogin: data1,
        resetData: [],
        reset: [],
      };
    case ADDCONTACT:
      const { dataC } = action.payload;

      if (dataC?.errors) {
        return {
          ...state,
          error: dataC.message,
        };
      } else {
        return {
          ...state,
          contactStatus: "success",
        };
      }
    case SETDATA:
      return {
        ...state,
        error: "",
        userTypeLogin:[],
      };
    case ADDDATA:
      const { data } = action.payload;
      if (data?.errors) {
        return {
          ...state,
          error: data.message,
        };
      } else if (data?.keyValue?.mobile) {
        return {
          ...state,
          error: "Mobile No already exist",
        };
      } else if (data?.keyValue?.email) {
        return {
          ...state,
          error: "email already exist",
        };
      } else {
        return {
          ...state,
          userTypeLogin: [data],
          status: "Success",
          error: "",
        };
      }

    default:
      return state;
  }
};
export default user1;
