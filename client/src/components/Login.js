import React from "react";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { connect } from "react-redux";
import swal from "sweetalert";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { userRegis, getData, userLogin } from "../action";
import "../App.css";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
function Login(props) {
  
  const notifySign = () => swal("Sign Up SuccessFully", "success");
  const notifyError = () => swal("Password Not matched", "", { icon: "error" });
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
  const [login, setLogin] = useState(true);
  const [nameError, setNameError] = useState("");
  const [passError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [lgData, setLgData] = useState({
    email1: "",

    password1: "",
  });
  const { username, email, mobile, password } = data;
  const { email1, password1 } = lgData;
  function signUp() {
    setLogin(false);
  }

  function loginFun() {
    setLogin(true);
  }
  function loginUser() {
    userLogin(lgData);

    // const newLogin = apidata.filter(
    //   (item) => item.email == lgData.email1 && item.password == lgData.password1
    // );
    // console.log(newLogin);
    // if (newLogin.length == 0) {
    //   notifyError()
    // } else {
    //   userLogin(lgData);
    // }
  }
  async function submited() {
    var hasNumber = /\d/;
    if (hasNumber.test(data.username)) {
      setNameError("Name does not conatin numbers");
      setPasswordError("");
    } else if (data.password.length != 8) {
      setPasswordError("password must be 8 char length");
      setNameError("");
    } else {
      setNameError("");
      setPasswordError("");
      await userRegis(data);
    }
  }

  const handlerLoginName = (e) => {
    console.log(e.target.value);
    setLgData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const handlerName = (e) => {
    console.log(e.target.value);
    setData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
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
      setData({
        username: "",
        email: "",
        mobile: "",
        password: "",
      });
      notifySign();
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
          {login ? (
            <Grid sm="6" md="3.4" xs="8" className="loginBox12">
              <Typography variant="h5" className="loginName">
                Login
              </Typography>
              <TextField
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Email here"
                className="inputButton"
                fullWidth
                value={email1}
                name="email1"
                variant="filled"
                sx={{ mb: "10px" }}
                onChange={handlerLoginName}
              />
              <TextField
                onChange={handlerLoginName}
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                name="password1"
                value={password1}
                placeholder="Password"
                className="inputButton"
                fullWidth
                variant="filled"
                sx={{ mb: "10px" }}
              />

              {userTypeLogin[0]?.result == "not found"?(<b>Email and password set Not correct</b>):(<></>)}
              {userTypeLogin[0]?.result == "enter"?(<b>Please fill all the fields</b>):(<></>)}
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
              <TextField
                id="outlined-basic"
                name="username"
                placeholder="Enter Name here"
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                onChange={handlerName}
                fullWidth
                value={username}
                variant="filled"
                className="inputButton"
                sx={{ mb: "10px" }}
              />
              {nameError ? <>{nameError}</> : <></>}
              <TextField
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                placeholder="Enter Mobile No"
                value={mobile}
                className="inputButton"
                onChange={handlerName}
                name="mobile"
                fullWidth
                variant="filled"
                sx={{ mb: "10px" }}
              />

              <TextField
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                placeholder="Enter Email here"
                className="inputButton"
                fullWidth
                name="email"
                value={email}
                variant="filled"
                onChange={handlerName}
                sx={{ mb: "10px" }}
              />
              <TextField
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                placeholder="Password"
                value={password}
                name="password"
                className="inputButton"
                onChange={handlerName}
                fullWidth
                variant="filled"
                sx={{ mb: "10px" }}
              />
              {passError ? <>{passError}</> : <></>}
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
