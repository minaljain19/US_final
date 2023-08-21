import React, { useEffect, useState } from "react";
import Header from "./Header";
import Chip from "@mui/material/Chip";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { userRegis, getData, userLogin, getCallData } from "../action";
import Toolbar from "@mui/material/Toolbar";
import Table from "@mui/material/Table";
import Avatar from "@mui/material/Avatar";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CallEndIcon from "@mui/icons-material/CallEnd";
import DialpadIcon from "@mui/icons-material/Dialpad";
import Input from "@mui/material/Input";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableCell from "@mui/material/TableCell";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TableContainer from "@mui/material/TableContainer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { userLogout } from "../action";
import Button from "@mui/material/Button";
import MicOffIcon from "@mui/icons-material/MicOff";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography, useScrollTrigger } from "@mui/material";
import Popover from "@mui/material/Popover";
import logo from "./../logo22.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Device, Connection } from "twilio-client";
function CallHistory(props) {
  const [msg, showMessage] = useState({});
  const { list, apidata, userLogout, getCallData, userTypeLogin, callData } =
    props;
  const [callStatus, setCallStatus] = useState("idle");
  const tokenUrl = "http://localhost:5000/api/get-twilio-token";
  async function getToken() {
    const response = await axios.get(tokenUrl);
    return response.data.token;
  }
  const makeCall = async () => {
    setCallStatus("calling");
    const tokenResponse = await getToken();

    const device = new Device(tokenResponse, {
      enableRingingState: true,
    });
    console.log("device", device);
    if (tokenResponse) {
      console.log("token ress get")
      device.setup(tokenResponse, {
        codecPreferences: ["opus", "pcmu"],
        maxAverageBitrate: 16000,
        debug: true,
        enableRingingState: true,
      });
    }
    device.on("disconnect", function (connection) {
      setCallStatus("Ended");
      device.disconnectAll();
    });
    device.on("error", function (error) {
      console.log("error", error, error?.message.length);
      if (
        error.code === 31205 ||
        error.code === 31000 ||
        error.code === 31005
      ) {
      } else if (error?.message && error?.message.length === 85) {
        showMessage({
          message: error?.message,
          variant: "error",
        });
        console.error("Unidentified Twilio error: ", error);
      }
    });
    device.on("ready", () => {
      console.log("Twilio Device is ready");
      const connection = device.connect({
        to: "+12054190332",
        from: "+15188726700",
      });
      console.log("connection", connection);
      connection.on("ringing", async () => {
        // alert("call initiated");
        console.log("AS", connection);
        const callData = {
          toNumber: "+12054190332",
          fromNumber: "+15188726700",
        };
        const ress = await axios
          .post("http://localhost:5000/api/make-call", callData)
          .then((response) => {
            console.log("Call data sent to backend:", response.data);
          })
          .catch((error) => {
            console.error("Error sending call data:", error);
          });
      });
    });
  };
  const navigate = useNavigate();

  const [value, setValue] = React.useState("1");
  const [call, setCall] = useState("false");
  const [num, setNum] = useState("");
  const [age, setAge] = React.useState("");
  const handleChanges = (event) => {
    setAge(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const callNow = () => {
    makeCall();
    setCall("true");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNum = (e) => {

    setNum(() => num + e.target.value);
  };
  const removeNum = () => {
    const newNum = num.slice(0, num.length - 1);
    setNum(() => newNum);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open1 = Boolean(anchorEl2);
  const handleClick1 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl2(null);
  };
  const logOut = () => {
    userLogout();
  };
  useEffect(() => {
    if (!userTypeLogin[0]?._id) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    getCallData();
  }, []);
  useEffect(() => {
    if (!userTypeLogin[0]?._id) {
      navigate("/");
    }
  }, [userTypeLogin]);
  return (
    <>
      {/* <button onClick={makeCall}>Make Call</button>
      <p>Call Status: </p> */}
      <Box className="header" sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="appBar1">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img src={logo} className="logoStyle" />
            </Typography>
            {/* <Avatar>H</Avatar> */}
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
              anchorEl={anchorEl2}
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
            {/* <Button color="inherit">Logout</Button> */}
            <Button>{/* <NotificationsNoneIcon /> */}</Button>
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
          anchorEl={anchorEl}
          onClose={handleClose}
          sx={{ maxHeight: 540 }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ width: "290px", typography: "body1" }}>
            {call == "false" ? (
              <TabContext className="tabContent" value={value}>
                <TabPanel className="tabBack tabPanel2" value="1">
                  <Grid className="backImg">
                    <TextField
                      disableUnderline={false}
                      className="numFiller"
                      InputProps={{ disableUnderline: true }}
                      value={num}
                      variant="standard"
                      fullWidth
                    />

                    <BackspaceIcon onClick={removeNum} className="backSpace" />
                  </Grid>
                  <Grid className="tabPanelForNum">
                    <Button value="1" onClick={handleNum} className="numButton">
                      1
                    </Button>
                    <Button
                      size="small"
                      value="2"
                      onClick={handleNum}
                      className="numButton"
                    >
                      2
                    </Button>
                    <Button
                      size="small"
                      value="3"
                      onClick={handleNum}
                      className="numButton"
                    >
                      3
                    </Button>
                    <Button
                      size="small"
                      value="4"
                      onClick={handleNum}
                      className="numButton"
                    >
                      4
                    </Button>
                    <Button
                      size="small"
                      value="5"
                      onClick={handleNum}
                      className="numButton"
                    >
                      5
                    </Button>
                    <Button
                      size="small"
                      value="6"
                      onClick={handleNum}
                      className="numButton"
                    >
                      6
                    </Button>
                    <Button
                      size="small"
                      value="7"
                      onClick={handleNum}
                      className="numButton"
                    >
                      7
                    </Button>
                    <Button
                      size="small"
                      value="8"
                      onClick={handleNum}
                      className="numButton"
                    >
                      8
                    </Button>
                    <Button
                      size="small"
                      value="9"
                      onClick={handleNum}
                      className="numButton"
                    >
                      9
                    </Button>
                    <Button
                      size="small"
                      value="0"
                      onClick={handleNum}
                      className="numButton"
                    >
                      0
                    </Button>
                    <Button size="small" className="numButton">
                      *
                    </Button>
                    <Button className="numButton">#</Button>
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
              <TabContext className="tabCall" value={value}>
                <TabPanel className="" value="1">
                  <Grid className="tabPanelForNum">
                    <Typography className="callName">Minal jain</Typography>
                    <Typography>+91 989399399</Typography>
                    <Typography className="calling">
                      {callStatus} ...
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
                      onClick={() => setCall("false")}
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
        {/* <Grid className="tableFilter">f
           <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
        <Select
             displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          value={age}
          onChange={handleChanges}
        >
    
          <MenuItem value={10}>Connected</MenuItem>
          <MenuItem value={20}>Rejected</MenuItem>
          <MenuItem value={30}>Busy</MenuItem>
        </Select>
      </FormControl>
       </Grid> */}
        <TableContainer className="callHistory" component={Paper}>
          <Table aria-label="spanning table" className="callHistoryTable">
            <TableHead className="tableHeader">
              <TableRow>
                <TableCell className="heading">Call Id</TableCell>
                <TableCell className="heading">From</TableCell>
                <TableCell className="heading">To</TableCell>
                <TableCell className="heading">Call Time</TableCell>
                <TableCell className="heading">Duration</TableCell>
                <TableCell className="heading">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {callData
                .filter((item) => item.user_id == userTypeLogin[0]?._id)
                .map((eachCall) => (
                  <TableRow key="12">
                    <TableCell style={{ width: "20%", fontWeight: "bold" }}>
                      {eachCall.callId}
                    </TableCell>
                    <TableCell style={{ width: "20%", fontWeight: "bold" }}>
                      {eachCall.to}
                    </TableCell>
                    <TableCell style={{ width: "20%", fontWeight: "bold" }}>
                      {eachCall.from}
                    </TableCell>
                    <TableCell style={{ width: "20%", fontWeight: "bold" }}>
                      {eachCall.callTime} AM
                    </TableCell>
                    <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                      {eachCall.duration} sec
                    </TableCell>
                    <TableCell style={{ width: "4%" }}>
                      {" "}
                      <Chip className="ringingCall" label={eachCall.action} color="success" />
                    </TableCell>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      userLogout,
      getCallData,
    },

    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallHistory);
