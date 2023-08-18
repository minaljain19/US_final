import axios from "axios";
const initialData = {
  list: [],
  apidata: [],
  error: [],
  status: [],
  userTypeLogin: [],
};

const user1 = (state = initialData, action) => {
  switch (action.type) {
    case "getUserData": {
      // console.log("action.payload", action.payload);
      return {
        ...state,
        apidata: action.payload,
      };
    }

    case "LOGIN":
      const { data1 } = action.payload;
      console.log("set h", data1);
      return {
        ...state,
        userTypeLogin: data1,
      };
    case "ADDDATA":
      const { data } = action.payload;
      // console.log("fdfddf", data);
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
