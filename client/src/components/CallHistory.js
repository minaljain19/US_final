import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import CustomTableCell from "./TableCellComponent";
import Box from "@mui/material/Box";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCallData } from "../Action";
import Toolbar from "@mui/material/Toolbar";
import Table from "@mui/material/Table";
import Avatar from "@mui/material/Avatar";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CallEndIcon from "@mui/icons-material/CallEnd";
import DialpadIcon from "@mui/icons-material/Dialpad";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TableContainer from "@mui/material/TableContainer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { userLogout,getTokens } from "../Action";
import Button from "@mui/material/Button";
import MicOffIcon from "@mui/icons-material/MicOff";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import logo from "../Assests/logo22.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Device, Connection } from "twilio-client";
import { buttonNumber, tableHeading } from "./Constant.js";
function CallHistory(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    value: "1",
    call: "false",
    num: "+1",
    age: "",
    msg: {},
    anchorEl: null,
    anchorEl2: null,
    callStatus: "idle",
  });

  const { apidata, userLogout, getCallData, userTypeLogin, callData,getTokens, } =
    props;
  const tokenUrl = "http://localhost:5000/api/get-twilio-token";
  async function getToken() {
    const response = await axios.get(tokenUrl);
    return response.data.token;
  }
  const makeCall = async () => {
    const tokenResponse = await getToken();
    const device = new Device(tokenResponse, {
      enableRingingState: true,
    });
    console.log("device", device);
    if (tokenResponse) {
      console.log("token ress get");
      device.setup(tokenResponse, {
        codecPreferences: ["opus", "pcmu"],
        maxAverageBitrate: 16000,
        debug: true,
        enableRingingState: true,
      });
    }
    device.on("disconnect", function (connection) {
      setState((prevState) => ({
        ...prevState,
        callStatus: "Ended",
      }));
      device.disconnectAll();
      setState((prevState) => ({
        ...prevState,
        call: "false",
        callStatus: "idle",
      }));
    });
    device.on("error", function (error) {
      console.log("error", error, error?.message.length);
      if (
        error.code === 31205 ||
        error.code === 31000 ||
        error.code === 31005
      ) {
      } else if (error?.message && error?.message.length === 85) {
        setState((prevState) => ({
          ...prevState,
          msg: {
            message: error?.message,
            variant: "error",
          },
        }));

        console.error("Unidentified Twilio error: ", error);
      }
    });
    device.on("ready", () => {
      console.log("Twilio Device is ready");
      const connection = device.connect({
        to: state.num,
        from: "+15188726700",
      });
      console.log("num", state.num);
      console.log("connection", connection);
      connection.on("ringing", async () => {
        setState((prevState) => ({
          ...prevState,
          callStatus: "calling",
        }));
      });
    });
  };
  // const handleChanges = (event) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     age: event.target.value,
  //   }));
  // };
  const handleChange = (event, newValue) => {
    setState((prevState) => ({
      ...prevState,
      value: newValue,
    }));
  };

  const callNow = () => {
    makeCall();
    setState((prevState) => ({
      ...prevState,
      call: "true",
    }));
  };
  const handleClick = (event) => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: event.currentTarget,
    }));
  };
  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: null,
    }));
  };
  const handleNum = (e) => {
    setState((prevState) => ({
      ...prevState,
      num: state.num + e.target.value,
    }));
  };
  const removeNum = () => {
    const newNum = state.num.slice(0, state.num.length - 1);
    setState((prevState) => ({
      ...prevState,
      num: newNum,
    }));
  };
  const open = Boolean(state.anchorEl);
  const id = open ? "simple-popover" : undefined;
  const open1 = Boolean(state.anchorEl2);
  const handleClick1 = (event) => {
    setState((prevState) => ({
      ...prevState,
      anchorEl2: event.currentTarget,
    }));
  };
  const handleClose1 = () => {
    setState((prevState) => ({
      ...prevState,
      anchorEl2: null,
    }));
  };
  const callEnded = () => {
    console.log("Hanging up...");
    setState((prevState) => ({
      ...prevState,

      call: "false",
    }));
  };
  const logOut = () => {
    userLogout();
  };

  useEffect(() => {
    if (!userTypeLogin[0]?._id) {
      navigate("/");
    }
    getCallData();
  }, []);
  useEffect(() => {
    if (!userTypeLogin[0]?._id) {
      navigate("/");
    }
  }, [userTypeLogin]);
  return (
    <>
      <Box className="header" sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="appBar1">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img src={logo} className="logoStyle" />
            </Typography>
            <Typography className="firstName">
              {userTypeLogin[0]?.username}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="">
                <IconButton
                  onClick={handleClick1}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open1 ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={state.anchorEl2}
              id="account-menu"
              open={open1}
              onClose={handleClose1}
              onClick={handleClose1}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem className="logOut" onClick={handleClose1}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem className="logOut" onClick={logOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid sm="10" md="10" xs="10" className="callB">
        <Button
          className="callButon"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          Call
        </Button>
        <Popover
          className="popOver"
          id={id}
          open={open}
          anchorEl={state.anchorEl}
          onClose={handleClose}
          sx={{ maxHeight: 540 }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ width: "290px", typography: "body1" }}>
            {state.call == "false" ? (
              <TabContext className="tabContent" value={state.value}>
                <TabPanel className="tabBack tabPanel2" value="1">
                  <Grid className="backImg">
                    <TextField
                      disableUnderline={false}
                      className="numFiller"
                      InputProps={{ disableUnderline: true }}
                      value={state.num}
                      variant="standard"
                      fullWidth
                    />

                    <BackspaceIcon onClick={removeNum} className="backSpace" />
                  </Grid>
                  <Grid className="tabPanelForNum">
                    {buttonNumber.map((item, index) => (
                      <Button
                        value={item}
                        onClick={handleNum}
                        className="numButton"
                      >
                        {item}
                      </Button>
                    ))}
                  </Grid>
                  <Grid className="callButtonStyle">
                    <IconButton
                      onClick={callNow}
                      className="callBut"
                      aria-label="delete"
                    >
                      <PhoneIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </TabPanel>
                <TabPanel className="tabForContact tabPanel" value="2">
                  <Paper style={{ maxHeight: 445, overflow: "auto" }}>
                    <Typography className="conatctList" variant="h6">
                      Contact List
                    </Typography>
                    <List>
                      {apidata
                        .filter((item) => item._id != userTypeLogin[0]?._id)
                        .map((eachCall) => (
                          <ListItem>
                            <ListItemText
                              primary={eachCall.username}
                              secondary={eachCall.mobile}
                            />
                            <ListItemIcon>
                              <IconButton
                                className="callButton"
                                aria-label="delete"
                                size="small"
                              >
                                <PhoneIcon fontSize="inherit" />
                              </IconButton>
                            </ListItemIcon>
                          </ListItem>
                        ))}
                    </List>
                  </Paper>
                </TabPanel>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    centered
                  >
                    <Tab className="icCall" icon={<DialpadIcon />} value="1" />
                    <Tab
                      className="icCall"
                      icon={<PersonPinIcon />}
                      value="2"
                    />
                  </TabList>
                </Box>
              </TabContext>
            ) : (
              <TabContext className="tabCall" value={state.value}>
                <TabPanel className="" value="1">
                  <Grid className="tabPanelForNum">
                    <Typography className="callName">Minal jain</Typography>
                    <Typography>+91 989399399</Typography>
                    <Typography className="calling">
                      {state.callStatus} ...
                    </Typography>
                    <Grid container className="callOption">
                      <Grid sm="3" md="3" xs="2"></Grid>
                      <Grid sm="3" md="3" xs="3">
                        <IconButton>
                          <MicOffIcon />
                        </IconButton>
                        <Typography>Mute</Typography>
                      </Grid>
                      <Grid sm="3" md="3" xs="3">
                        <IconButton>
                          <DoNotDisturbOnIcon />
                        </IconButton>
                        <Typography>Hold</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className="callButtonStyle1">
                    <IconButton
                      className="callEnded"
                      onClick={callEnded}
                      aria-label="delete"
                    >
                      <CallEndIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </TabPanel>
              </TabContext>
            )}
          </Box>
        </Popover>
      </Grid>
      <Grid sm="8" md="8" xs="10">
        <Typography variant="h5" className="callT">
          Call History
        </Typography>
        <TableContainer className="callHistory" component={Paper}>
          <Table aria-label="spanning table" className="callHistoryTable">
            <TableHead className="tableHeader">
              <TableRow>
                {tableHeading.map((item, index) => (
                  <TableCell className="heading">{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {callData
                .filter((item) => item.user_id == userTypeLogin[0]?._id)
                .map((eachCall) => (
                  <TableRow key="12">
                    <CustomTableCell content={eachCall.callId} />
                    <CustomTableCell content={eachCall.to} />
                    <CustomTableCell content={eachCall.from} />
                    <CustomTableCell content={`${eachCall.callTime} AM`} />
                    <CustomTableCell content={`${eachCall.duration} sec`} />
                    <CustomTableCell
                      chipLabel={eachCall.action}
                      chipColor="success"
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
    callData: state?.user1?.callData,
    tokenData: state?.user1?.tokenData,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      userLogout,
      getCallData,
      getTokens
    },

    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallHistory);
