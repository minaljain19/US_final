import React from "react";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import swal from "sweetalert";
import CustomTextField from "./CustomTextField";
import TextField from "@mui/material/TextField";
import { bindActionCreators } from "redux";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import {
  userRegis,
  getData,
  goLoginn,
  userLogin,
  resetPassword,
  setError,
  userUpdatePass,
} from "../Action";
import "../App.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
function Login(props) {
  const notifySign = () => swal("Sign Up SuccessFully", "success");
  const navigate = useNavigate();
  const {
    userRegis,
    setError,
    resetPassword,
    userUpdatePass,
    userLogin,
    getData,
    goLoginn,
    userTypeLogin,
    error,
    reset,
    resetData,
    status,
    nameError,
    passError,
    mobError,
    allError,
  } = props;

  const [state, setState] = useState({
    data: {
      username: "",
      email: "",
      mobile: "",
      password: "",
      cPassword: "",
    },
    fData: {
      fEmail: "",
      fPass: "",
      fCPass: "",
    },
    lgData: {
      email1: "",
      password1: "",
    },
    emailErr: "",
    nameError: "",
    mobError: "",
    passError: "",
    allError: "",
    login: "true",
    resetPassErr: "",
    showLoginPass: false,
    showSignPass: false,
    showSignCPass: false,
    showForgotPass: false,
    showForgotCPass: false,
  });
  const {
    login,
    resetPassErr,
    showLoginPass,
    showSignCPass,
    showSignPass,
    showForgotPass,
    showForgotCPass,
  } = state;
  const { username, email, mobile, password, cPassword } = state.data;
  const { email1, password1 } = state.lgData;
  const { fEmail, fPass, fCPass } = state.fData;

  function signUp() {
    setError()
    setState((prevState) => ({
      ...prevState,
      login: "false",
    }));
  }
  function forgotPass() {
    setError()
    setState((prevState) => ({
      ...prevState,
      login: "forgot",
      lgData: {
        email1: "",
        password1: "",
      },
      fData: {
        fEmail: "",
        fPass: "",
        fCPass: "",
      },
    }));
  }

  function loginFun() {
    setState((prevState) => ({
      ...prevState,
      login: "true",
      allError: "",
      nameError: "",
      passError: "",
      mobError: "",
    }));
    goLoginn();
  }
  function loginUser() {
    userLogin({ email1, password1 });
  }
  async function changePass() {
    if (fCPass != fPass) {
      setState((prevState) => ({
        ...prevState,
        resetPassErr: "Password must be same",
      }));
    } else if (fPass.length !== 8) {
      setState((prevState) => ({
        ...prevState,
        resetPassErr: "password must be 8 character",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        resetPassErr: "",
      }));
      await userUpdatePass({ fEmail, fPass });
    }
  }
  async function submited() {
    var hasNumber = /\d/;
    const hasAlphbet = /[a-zA-Z]/;
    if (username === "" || mobile === "" || password === "" || email == "") {
      setState((prevState) => ({
        ...prevState,
        allError: "Please Fill all the fields",
        nameError: "",
        passError: "",
        mobError: "",
      }));
    } else if (hasNumber.test(username)) {
      setError();
      setState((prevState) => ({
        ...prevState,
        nameError: "Name does not contain numbers",
        passError: "",
        mobError: "",
        allError: "",
      }));
    } else if (hasAlphbet.test(mobile)) {
      setError();
      setState((prevState) => ({
        ...prevState,
        mobError: "mobile no does not contain alphabet",
        nameError: "",
        passError: "",
        allError: "",
      }));
    } else if (mobile.length != 10) {
      setError();
      setState((prevState) => ({
        ...prevState,
        mobError: "Mobile No. must be 10 digits",
        nameError: "",
        passError: "",
        allError: "",
      }));
    } else if (password.length != 8) {
      setError();
      setState((prevState) => ({
        ...prevState,
        passError: "password must be 8 char length",
        nameError: "",
        mobError: "",
        allError: "",
      }));
    } else if (password != cPassword) {
      setError();
      setState((prevState) => ({
        ...prevState,
        passError: "Password must be same",
        nameError: "",
        mobError: "",
        allError: "",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        nameError: "",
        passError: "",
        mobError: "",
        allError: "",
      }));
      await userRegis({ username, email, mobile, password });
    }
  }

  const handlerEmailForgot = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      fData: {
        ...state.fData,
        [name]: value,
      },
    }));
  };
  const handlerLoginName = (e) => {
    setError();
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      lgData: {
        ...state.lgData,
        [name]: value,
      },
    }));
  };
  console.log(userTypeLogin);
  const resetP = () => {
    var chkEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (fEmail !== "") {
      if (chkEmail.test(fEmail)) {
        setState((prevState) => ({
          ...prevState,
          emailErr: "",
        }));
        resetPassword(fEmail);
      } else {
        setState((prevState) => ({
          ...prevState,
          emailErr: "Not Valid url",
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        emailErr: "please Enter Email",
      }));
    }
  };
  const handleTogglePasswordVisibility = (data, val) => {
    setState((prevState) => ({
      ...prevState,
      [data]: !val,
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

  if (userTypeLogin[0]?._id) {
    navigate("/home");
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(reset);
  }, [reset]);

  useEffect(() => {
    if (resetData.length == 1) {
      setState((prevState) => ({
        ...prevState,
        login: "true",
      }));
    }
  }, [resetData]);
  return (
    <>
      <Grid container className="mainBox">
      <Box className="header" sx={{ flexGrow: 1 }}>
        <Header clsName="appBar"/>
        </Box>
        <Grid sm="12" md="12" xs="12" container className="loginBox1">
          {login == "true" ? (
            <Grid sm="6" md="3.4" xs="8" className="loginBox12">
              <Typography variant="h5" className="loginName">
                Sign In
              </Typography>
              <CustomTextField
                name="email1"
                placeholder="Enter Email Id"
                value={email1}
                onChange={handlerLoginName}
                fullWidth
              />

              <TextField
                autoComplete="off"
                fullWidth
                placeholder="Enter Password"
                type={showLoginPass ? "text" : "password"}
                value={password1}
                name="password1"
                onChange={handlerLoginName}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                className="inputButton"
                sx={{ mb: "10px" }}
                InputProps={{
                  disableUnderline: true,

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility(
                            "showLoginPass",
                            showLoginPass
                          )
                        }
                        value="showLoginPass"
                      >
                        {showLoginPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography onClick={forgotPass}>
                <Button>Forgot Password?</Button>
              </Typography>
              {userTypeLogin[0]?.result == "not found" ? (
                <Typography className="errorMsg">
                  Email and password not correct
                </Typography>
              ) : null}
              {userTypeLogin[0]?.result == "enter" ? (
                <Typography className="errorMsg">
                  Please fill all the fields
                </Typography>
              ) : null}
              <Button
                variant="contained"
                className="loginButton"
                onClick={loginUser}
                fullWidth
              >
                Sign In
              </Button>
              <Typography className="signUp">
                Don't have an account?{" "}
                <Button onClick={signUp}> Sign up </Button>
              </Typography>
            </Grid>
          ) : login == "forgot" ? (
            <Grid sm="6" md="3.4" xs="8" className="loginBox14">
              <Typography>
                Forgot your account’s password? Enter your email address.
              </Typography>

              <CustomTextField
                placeholder="Enter Email Id"
                fullWidth
                name="fEmail"
                value={fEmail}
                onChange={handlerEmailForgot}
              />

              {state.emailErr ? <>{state.emailErr}</> : null}
              {reset == "False" ? (
                <>Account not Registerd</>
              ) : reset == "True" ? (
                setState((prevState) => ({
                  ...prevState,
                  login: "forgotPass",
                }))
              ) : null}
              <Button
                variant="contained"
                color="error"
                className="loginButton"
                fullWidth
                onClick={resetP}
              >
                Submit
              </Button>
              <Typography className="signUp">
                If you don't want Forgot password
                <Button onClick={loginFun}>Sign In </Button>
              </Typography>
            </Grid>
          ) : login == "forgotPass" ? (
            <Grid sm="6" md="3.4" xs="8" className="loginBox14">
              <TextField
                autoComplete="off"
                fullWidth
                placeholder="Enter Password"
                type={showForgotPass ? "text" : "password"}
                value={fPass}
                name="fPass"
                onChange={handlerEmailForgot}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                className="inputButton"
                sx={{ mb: "10px" }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility(
                            "showForgotPass",
                            showForgotPass
                          )
                        }
                      >
                        {showForgotPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                placeholder="Confirm Password"
                autoComplete="off"
                type={showForgotCPass ? "text" : "password"}
                value={fCPass}
                name="fCPass"
                onChange={handlerEmailForgot}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                className="inputButton"
                sx={{ mb: "10px" }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility(
                            "showForgotCPass",
                            showForgotCPass
                          )
                        }
                      >
                        {showForgotCPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {resetPassErr ? (
                <Typography className="errorMsg">{resetPassErr}</Typography>
              ) : null}

              <Button
                variant="contained"
                color="error"
                className="loginButton"
                fullWidth
                onClick={changePass}
              >
                Change Password
              </Button>

              <Typography className="signUp">
                If you don't want Forgot password
                <Button onClick={loginFun}>Sign In </Button>
              </Typography>
            </Grid>
          ) : (
            <Grid sm="6" md="3.4" xs="8" className="loginBox13">
              <Typography variant="h5" className="loginName">
                Sign Up
              </Typography>
              {state.allError ? (
                <Typography className="errorMsg">{state.allError}</Typography>
              ) : (
                <></>
              )}
              <CustomTextField
                name="username"
                placeholder="Enter Full Name"
                onChange={handlerName}
                fullWidth
                value={username}
              />
              {state.nameError ? (
                <Typography className="errorMsg">{state.nameError}</Typography>
              ) : (
                <></>
              )}
              <CustomTextField
                placeholder="Enter Phone No."
                value={mobile}
                onChange={handlerName}
                name="mobile"
                fullWidth
              />
              {state.mobError ? (
                <Typography className="errorMsg">{state.mobError}</Typography>
              ) : (
                <></>
              )}
              <CustomTextField
                placeholder="Enter Email Id"
                fullWidth
                name="email"
                value={email}
                onChange={handlerName}
              />
              <TextField
                fullWidth
                autoComplete="off"
                placeholder="Enter Password"
                type={showSignPass ? "text" : "password"}
                value={password}
                name="password"
                onChange={handlerName}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                className="inputButton"
                sx={{ mb: "10px" }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility(
                            "showSignPass",
                            showSignPass
                          )
                        }
                      >
                        {showSignPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                autoComplete="off"
                placeholder="Confirm Password"
                type={showSignCPass ? "text" : "password"}
                value={cPassword}
                name="cPassword"
                onChange={handlerName}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                className="inputButton"
                sx={{ mb: "10px" }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility(
                            "showSignCPass",
                            showSignCPass
                          )
                        }
                      >
                        {showSignCPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {state.passError ? (
                <Typography className="errorMsg">{state.passError}</Typography>
              ) : (
                <></>
              )}
              {error ? (
                <Typography className="errorMsg">{error}</Typography>
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                color="error"
                className="loginButton"
                fullWidth
                onClick={submited}
              >
                Sign Up
              </Button>
              <Typography className="signUp">
                Already have an account?{" "}
                <Button onClick={loginFun}>Sign In </Button>
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
    reset: state?.user1?.reset,
    userTypeLogin: state?.user1?.userTypeLogin,
    resetData: state?.user1?.resetData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      userRegis,
      getData,
      userLogin,
      resetPassword,
      userUpdatePass,
      goLoginn,
      setError,
    },

    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
