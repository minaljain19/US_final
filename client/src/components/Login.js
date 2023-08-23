import React from "react";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { connect } from "react-redux";
import swal from "sweetalert";
import CustomTextField from "./CustomTextField";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { userRegis, getData, userLogin } from "../Action";
import "../App.css";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
function Login(props) {
  const notifySign = () => swal("Sign Up SuccessFully", "success");
  // const notifyError = () => swal("Password Not matched", "", { icon: "error" });
  const navigate = useNavigate();
  const {
    userRegis,
    userLogin,
    getData,
    list,
    apidata,
    userTypeLogin,
    error,
    status,
  } = props;
  const initialData = {
    data: {
      username: "",
      email: "",
      mobile: "",
      password: "",
    },
    lgData: {
      email1: "",
      password1: "",
    },
    nameError: "",
    passError: "",
    login: "true",
  };
  const [state, setState] = useState(initialData);
  const { username, email, mobile, password } = state.data;
  const { email1, password1 } = state.lgData;
  function signUp() {
    setState((prevState) => ({
      ...prevState,
      login: "false",
    }));
  }
  function loginFun() {
    setState((prevState) => ({
      ...prevState,
      login: "true",
    }));
  }
  function loginUser() {
    userLogin(state.lgData);
  }
  async function submited() {
    var hasNumber = /\d/;
    if (hasNumber.test(state.data.username)) {
      setState((prevState) => ({
        ...prevState,
        nameError: "Name does not contain numbers",
        passError: "",
      }));
    } else if (state.data.password.length != 8) {
      setState((prevState) => ({
        ...prevState,
        passError: "password must be 8 char length",
        nameError: "",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        nameError: "",
        passError: "",
      }));
      console.log(state.data);
      await userRegis(state.data);
    }
  }
  const handlerLoginName = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      lgData: {
        ...prevState.lgData,
        [name]: value,
      },
    }));
  };
  const handlerName = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };
  console.log("user Type", userTypeLogin);
  if (userTypeLogin[0]?._id) {
    navigate("/home");
  }

  useEffect(() => {
    if (error) {
    } else {
      getData();
      setState(
        (prevState) => ({
          ...prevState,
          data: {
            username: "",
            email: "",
            mobile: "",
            password: "",
          },
        }),
        notifySign()
      );
    }
  }, [error]);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Grid container className="mainBox">
        <Header />
        <Grid sm="12" md="12" xs="12" container className="loginBox1">
          {state.login != "false" ? (
            <Grid sm="6" md="3.4" xs="8" className="loginBox12">
              <Typography variant="h5" className="loginName">
                Login
              </Typography>
              <CustomTextField
                name="email1"
                placeholder="Enter Email here"
                value={email1}
                onChange={handlerLoginName}
                fullWidth
              />

              <CustomTextField
                onChange={handlerLoginName}
                name="password1"
                value={password1}
                placeholder="Password"
                fullWidth
              />

              {userTypeLogin[0]?.result == "not found" ? (
                <b>Email and password set Not correct</b>
              ) : (
                <></>
              )}
              {userTypeLogin[0]?.result == "enter" ? (
                <b>Please fill all the fields</b>
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                className="loginButton"
                onClick={loginUser}
                fullWidth
              >
                Login
              </Button>
              <Typography className="signUp">
                Don't have an account?{" "}
                <Button onClick={signUp}> Sign up </Button>
              </Typography>
            </Grid>
          ) : (
            <Grid sm="6" md="3.4" xs="8" className="loginBox13">
              <Typography variant="h5" className="loginName">
                Sign In
              </Typography>
              <CustomTextField
                name="username"
                placeholder="Enter Name here"
                onChange={handlerName}
                fullWidth
                value={username}
              />
              {state.nameError ? <>{state.nameError}</> : <></>}
              <CustomTextField
                placeholder="Enter Mobile No"
                value={mobile}
                onChange={handlerName}
                name="mobile"
                fullWidth
              />

              <CustomTextField
                placeholder="Enter Email here"
                fullWidth
                name="email"
                value={email}
                onChange={handlerName}
              />
              <CustomTextField
                placeholder="Password"
                value={password}
                name="password"
                onChange={handlerName}
                fullWidth
              />
              {state.passError ? <>{state.passError}</> : <></>}
              {error ? <b>{error}</b> : <b></b>}
              <Button
                variant="contained"
                color="error"
                className="loginButton"
                fullWidth
                onClick={submited}
              >
                Sign In
              </Button>
              <Typography className="signUp">
                Already have an account?{" "}
                <Button onClick={loginFun}>Login </Button>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    status: state?.user1?.status,
    apidata: state?.user1?.apidata,
    error: state?.user1?.error,
    userTypeLogin: state?.user1?.userTypeLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      userRegis,
      getData,
      userLogin,
    },

    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
