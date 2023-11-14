import React, { useEffect, useState } from "react";
import MicNoneIcon from "@mui/icons-material/MicNone";
import Box from "@mui/material/Box";
import SnackbarContent from "@mui/material/SnackbarContent";
import Header from "./Header";
import Dialog from "@mui/material/Dialog";
import SearchIcon from "@mui/icons-material/Search";
import DialogActions from "@mui/material/DialogActions";
import TabRow from "./TabRow";
import TablePagination from "@mui/material/TablePagination";
import DialogContent from "@mui/material/DialogContent";
import CText from "./CText";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Avatar from "@mui/material/Avatar";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CallEndIcon from "@mui/icons-material/CallEnd";
import DialpadIcon from "@mui/icons-material/Dialpad";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import {
  getCallData,
  getData,
  getCallLength,
  contactRegis,
  getContactDetail,
  updateUserProfileSection,
  filterContactApiData,
  getAllContactData,
  userLogout,
  filterByNumber,
  filterContactApiDataByNo,
  filterByNumberAndDate,
  filterByDate,
  getCallHisdata,
  getCallHisdataByDateAndName,
  deleteContactDetail,
  setNoRecord,
  contactRegisEdit,
} from "../Action";
import {
  getTwilioDeviceReady,
  getTwilioStatus,
  disconnectTwilioCall,
  muteTwilioCall,
  outGoing,
} from "./Twilio.js";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import MicOffIcon from "@mui/icons-material/MicOff";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import { useFetcher, useNavigate } from "react-router-dom";
import axios from "axios";
import { buttonNumber, tableHeading } from "./Constant.js";
import Loader from "./Loader";
function CallHistory(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    rowNum: 10,
    page: 1,
    searchDataOfCaller: "",
    openS: false,
    filterData: [],
    value: "1",
    searchData: "",
    call: "false",
    loader: false,
    showTwoPassField: false,
    errorConct: "",
    num: "+1",
    userName: "",
    email: "",
    mobileNo: "",
    password: "",
    age: "",
    msg: {},
    anchorEl: null,
    profileS: false,
    noChange: "",
    mute: false,
    page: false,
    editDatas: "false",
    anchorEl2: null,
    ProfileStatus: false,
    callDuration: 0,
    callStatus: "idle",
    tokenResponse: "",
    profile: "false",
    profileShowing: false,
    callHis: [],
    opensnake: false,
    opensnakeForUpd: false,
    opensnakeForUpdPass: false,
    passwordOld: "",
    contactAdd: false,
    contactNo: "",
    contactName: "",
    val: "",
    searchDataOfDate: "",
    showUpdatePass: false,
    showUpdatePassC: false,
    filterCallsData: [],
    showUpdatePassCon: false,
    valC: "",
    valPass: "",
    openModal: false,
    openModalForDelete: false,
    openModalForUpdate: false,
    deleteCon: "",
    filter: false,
  });
  const {
    apidata,
    userLogout,
    setNoRecord,
    getCallLength,
    getCallData,
    getCallHisdataByDateAndName,
    userTypeLogin,
    callData,
    filterContactApiDataByNo,
    contactRegis,
    contactStatus,
    getContactDetail,
    filterContactApiData,
    deleteContactDetail,
    filterByNumberAndDate,
    filterByDate,
    updateUserProfileSection,
    getData,
    contactData,
    contactDatas,
    deleteUser,
    filterByNumber,
    getAllContactData,
    getCallHisdata,
    contactRegisEdit,
    callDataLength,
  } = props;

  const {
    rowNum,
    tokenResponse,
    filterCallsData,
    rowsPerPage,
    showUpdatePassCon,
    loader,
    userName,
    mobileNo,
    password,
    showTwoPassField,
    searchDataOfDate,
    passwordC,
    email,
    mute,
    profileS,
    num,
    opensnake,
    opensnakeForUpd,
    opensnakeForUpdPass,
    contactAdd,
    contactName,
    contactNo,
    profileShowing,
    ProfileStatus,
    page,
    val,
    valC,
    valPass,
    openModal,
    openModalForDelete,
    openModalForUpdate,
    anchorEl2,
    callStatus,
    showUpdatePass,
    searchDataOfCaller,
    showUpdatePassC,
    errorConct,
    passwordOld,
    searchData,
    filterData,
    call,
    editDatas,
    noChange,
    deleteCon,
    openS,
    filter,
  } = state;
  const open = Boolean(state.anchorEl);
  const uid = userTypeLogin.length > 0 ? userTypeLogin[0]?._id : "";
  const id = open ? "simple-popover" : undefined;
  const open1 = Boolean(anchorEl2);
  const handleCloseModalUpdate = () => {
    setState((prevState) => ({
      ...prevState,
      openModalForUpdate: false,
      password: "",
      passwordOld: "",
      passwordC: "",
    }));
  };
  const handleCloseModalD = () => {
    setState((prevState) => ({
      ...prevState,
      openModalForDelete: false,
    }));
  };
  //modal close function
  const handleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      openModal: false,
      profileShowing: false,
      ProfileStatus: false,
    }));
  };
  //open profile page
  const editData = () => {
    setState((prevState) => ({
      ...prevState,
      openModal: true,
      profileShowing: false,
      showUpdatePass: false,
      showUpdatePassC: false,
      passwordOld: "",
      ProfileStatus: false,
      userName: userTypeLogin[0]?.username,
      mobileNo: userTypeLogin[0]?.mobile,
      email: userTypeLogin[0]?.email,
      password: "",
      passwordC: "",
      showTwoPassField: false,
    }));
  };

  //for pagination
  const handlePageChange = async (event, newPage) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
  };

  //password hide and show
  const handleTogglePasswordVisibility = (data, val) => {
    setState((prevState) => ({
      ...prevState,
      [data]: !val,
    }));
  };
  //snakebar for error maessage close
  const handleCloseSnakeForUpdPass = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      opensnakeForUpdPass: false,
    }));
  };
  const handleCloseSnakeForUpd = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      opensnakeForUpd: false,
    }));
  };
  const updatePass = () => {
    setState((prevState) => ({
      ...prevState,
      openModalForUpdate: true,
    }));
  };
  const handlerDateFill = (event) => {
    setState((prevState) => ({
      ...prevState,
      searchDataOfDate: event.target.value,
    }));
  };

  const handleCloseSnake = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      opensnake: false,
    }));
  };

  const fiilterContactData = () => {
    const hasAlp = /[a-zA-Z]/;
    const hasNum = /\d/;
    const user_id = userTypeLogin[0]?._id;
    if (hasAlp.test(searchData)) {
      let contactName = searchData;
      filterContactApiData({ contactName, user_id });
    }
    if (hasNum.test(searchData)) {
      let contactNo = searchData;

      filterContactApiDataByNo({ contactNo, user_id });
    }
    if (!searchData) {
      getContactDetail();
    }
  };

  //set old password
  const setOldpassword = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //set contact detail

  const setConatctDetail = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errorConct: "",
    }));
  };

  const handleChange = (event, newValue) => {
    setState((prevState) => ({
      ...prevState,
      value: newValue,
    }));
  };
  const upDatePass = () => {
    if (passwordOld == userTypeLogin[0].password) {
      if (passwordOld == "" || password == "" || passwordC == "") {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpdPass: true,
          valPass: "please fill the fields",
        }));
      } else if (password.length < 7 || passwordC.length < 7) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpdPass: true,
          valPass: "password length should be greater than 8",
        }));
      } else if (password != passwordC) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpdPass: true,
          valPass: "password and confirm password must be same ",
        }));
      } else if (password == passwordOld || passwordC == passwordOld) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpdPass: true,
          valPass: "old and new password cannot be same",
        }));
      } else {
        const _id = userTypeLogin[0]?._id;
        updateUserProfileSection({ _id, password });
        setState((prevState) => ({
          ...prevState,
          password: "",
          passwordC: "",
          openModalForUpdate: false,
          passwordOld: "",
          opensnakeForUpd: true,
          valC: "password updated successfully",
        }));
      }
    } else {
      if (passwordOld === "") {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpdPass: true,
          valPass: "please fill Old Password",
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpdPass: true,
          valPass: "please fill correct old password",
        }));
      }
    }
  };
  //update user profile
  const updateUserProfile = () => {
    const name = userTypeLogin[0]?.username;
    const mobile = userTypeLogin[0]?.mobile;
    const emails = userTypeLogin[0]?.email;

    var hasNumber = /\d/;
    var hasAlphbet = /[a-zA-Z]/;
    var chkEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const len = mobileNo.length;
    if (userName == name && mobile == mobileNo && email == emails) {
      setState((prevState) => ({
        ...prevState,
        ...prevState,

        opensnakeForUpd: true,
        valC: "please update any field",
      }));
    } else {
      if (userName === "" || mobileNo === "" || email == "") {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpd: true,
          valC: "please fill all Fields",
        }));
      } else if (hasNumber.test(userName)) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpd: true,
          valC: "Name does not contain numbers",
        }));
      } else if (hasAlphbet.test(mobileNo)) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpd: true,
          valC: "mobile no does not contain alphabet",
        }));
      } else if (!chkEmail.test(email)) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpd: true,
          valC: "please Enter Valid email Id",
        }));
      } else if (mobileNo.toString().length != 10) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpd: true,
          valC: "Mobile Number must be 10 digits",
        }));
      } else if (
        apidata.some(
          (user) => user._id != userTypeLogin[0]?._id && user.email == email
        )
      ) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpd: true,
          valC: "Email already exists",
        }));
      } else if (
        apidata.some(
          (user) => user._id != userTypeLogin[0]?._id && user.mobile == mobileNo
        )
      ) {
        setState((prevState) => ({
          ...prevState,
          opensnakeForUpd: true,
          valC: "Mobile Number Already exists",
        }));
      } else {
        const _id = userTypeLogin[0]?._id;
        updateUserProfileSection({ _id, userName, email, mobileNo });
        setState((prevState) => ({
          ...prevState,
          openModal: false,
          passwordOld: "",
          opensnake: true,
          val: "Updated SuccessFully",
        }));
      }
    }
  };
  //filter function
  async function handleFilterRemove() {
    const currentPage = page + 1;
    if (searchDataOfCaller || searchDataOfDate) {
      setState((prevState) => ({
        ...prevState,
        searchDataOfCaller: "",
        searchDataOfDate: "",
        loader: true,
        filter: false,
      }));
      await getCallData({ currentPage, uid, page, rowNum });
      await getCallLength(userTypeLogin[0]?._id);
      setState((prevState) => ({
        ...prevState,
        loader: false,
      }));
    }
  }

  const handleAllFilter = async () => {
    const currentPage = page + 1;
    if (searchDataOfCaller || searchDataOfDate) {
      setState((prevState) => ({
        ...prevState,
        filter: true,
      }));
      const user_id = userTypeLogin[0]?._id;

      if (searchDataOfCaller && !searchDataOfDate && user_id) {
        const hasAlp = /[a-zA-Z]/;
        const hasNum = /\d/;
        if (hasAlp.test(searchDataOfCaller)) {
          try {
            const res = await axios.get(
              `http://localhost:5000/contactList?userId=${user_id}&contactName=${searchDataOfCaller}`
            );
            const callToInNewList = res.data.map((item) => item.contactNo);

            if (res.data.length > 0) {
              await getCallHisdata({
                user_id,
                callToInNewList,
                currentPage,
                rowNum,
              });
            } else {
              setNoRecord();
            }
          } catch (e) {
            console.log("error", e);
          }
        } else {
          const to = searchDataOfCaller;
          setState((prevState) => ({
            ...prevState,
            loader: true,
          }));
          await filterByNumber({ user_id, to, currentPage, rowNum });
          setState((prevState) => ({
            ...prevState,
            loader: false,
          }));
        }
      }

      if (searchDataOfDate) {
        const dats = searchDataOfDate.split("-");
        if (dats[1] < 10) {
          dats[1] = dats[1].slice(1);
        }
        const callTime = dats[1] + "/" + dats[2] + "/" + dats[0];

        if (searchDataOfCaller) {
          const hasAlp = /[a-zA-Z]/;
          if (hasAlp.test(searchDataOfCaller)) {
            try {
              const res = await axios.get(
                `http://localhost:5000/contactList?userId=${user_id}&contactName=${searchDataOfCaller}`
              );

              const callToInNewList = res.data.map((item) => item.contactNo);

              if (res.data.length > 0) {
                await getCallHisdataByDateAndName({
                  user_id,
                  callToInNewList,
                  callTime,
                  currentPage,
                  rowNum,
                });
              } else {
                setNoRecord();
              }
            } catch (e) {
              console.log("error", e);
            }
          } else {
            const to = searchDataOfCaller;
            setState((prevState) => ({
              ...prevState,
              loader: true,
            }));
            await filterByNumberAndDate({
              user_id,
              to,
              callTime,
              currentPage,
              rowNum,
            });
            setState((prevState) => ({
              ...prevState,
              loader: false,
            }));
          }
        } else {
          setState((prevState) => ({
            ...prevState,
            loader: true,
          }));
          await filterByDate({ user_id, callTime, currentPage, rowNum });
          setState((prevState) => ({
            ...prevState,
            loader: false,
          }));
        }
      }
    }
  };

  //search item in call list

  function searchItemInCall(event) {
    const hasNumber = /\d/;
    setState((prevState) => ({
      ...prevState,
      searchDataOfCaller: event.target.value,
    }));
  }

  function searchItem(event) {
    setState((prevState) => ({
      ...prevState,
      searchData: event.target.value,
    }));
  }

  const callNow = () => {
    const currentPage = page + 1;
    getTwilioDeviceReady(
      tokenResponse,
      state,
      setState,
      getCallData,
      page,
      rowNum,
      getCallLength,
      uid
    );
    if (state.num.length < 12) {
      setState((prevState) => ({
        ...prevState,
        val: "Not valid Number",
        opensnake: true,
      }));
      setState((prevState) => ({
        ...prevState,
        call: "false",
      }));
    } else if (state.num.length === 12) {
      outGoing(state, setState, userTypeLogin[0]?._id);
    } else {
      setState((prevState) => ({
        ...prevState,
        call: "false",
        opensnake: true,
      }));
    }
  };
  //set textfield value

  const setUserName = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClick = (event) => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: event.currentTarget,
      contactName: "",
      contactNo: "",
      num: "+1",
      contactAdd: false,
      profileShowing: false,
      ProfileStatus: false,
    }));
  };
  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: null,
    }));
  };

  const action = <React.Fragment></React.Fragment>;
  //handle number
  const handleNum = (e) => {
    setState((prevState) => ({
      ...prevState,
      num: state.num + e.target.value,
    }));
  };
  //mute and unmute call
  const muteCall = () => {
    muteTwilioCall(true, state, setState);
  };
  const unmuteCall = () => {
    muteTwilioCall(false, state, setState);
  };
  //remove num from input
  const removeNum = () => {
    const newNum = state.num.slice(0, state.num.length - 1);
    setState((prevState) => ({
      ...prevState,
      num: newNum,
    }));
  };

  const [expanded, setExpanded] = useState(false);

  const handleChanged = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChangePage = (event, newPage) => {
    setState((prevState) => ({
      ...prevState,
      page: newPage,
    }));
    console.log("page", page);
  };

  const handleChangeRowsPerPage = (event) => {
    setState((prevState) => ({
      ...prevState,
      rowNum: parseInt(event.target.value, 10),
      page: 0,
    }));
    console.log("rownum", rowNum);
  };
  const handleChanger = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick1 = (event) => {
    setState((prevState) => ({
      ...prevState,
      anchorEl2: !event.currentTarget,
    }));
  };
  //profile showing fun
  function showP() {
    setState((prevState) => ({
      ...prevState,
      profileShowing: !profileShowing,
    }));
  }
  //profile hide or show
  function ShowDropDown() {
    setState((prevState) => ({
      ...prevState,
      ProfileStatus: !ProfileStatus,
      profileShowing: false,
    }));
  }
  //add no in contact list
  const addPhoneNo = async (event) => {
    const userId = userTypeLogin[0]?._id;
    if (contactName == "" || contactNo == "") {
      setState((prevState) => ({
        ...prevState,
        errorConct: "please fill all the Fields",
      }));
    } else if (contactNo.length < 10 || contactNo.length > 10) {
      setState((prevState) => ({
        ...prevState,
        errorConct: "Enter valid number",
      }));
    } else if (event == "false") {
      if (
        contactData.some(
          (item) =>
            item.contactNo == contactNo && item.userId == userTypeLogin[0]?._id
        )
      ) {
        setState((prevState) => ({
          ...prevState,
          errorConct: "Phone no. already exists",
        }));
      } else if (
        contactData.some(
          (item) =>
            item.contactName == contactName &&
            item.userId == userTypeLogin[0]?._id
        )
      ) {
        setState((prevState) => ({
          ...prevState,
          errorConct: "Name already exists",
        }));
      } else {
        await contactRegis({ contactName, contactNo, userId });
        await getContactDetail();
        setState((prevState) => ({
          ...prevState,
          val: "Contact Added successfully",
          opensnake: true,
          errorConct: "",
          contactName: "",
          contactNo: "",
          contactAdd: false,
        }));
      }
    } else if (event != "false") {
      if (
        contactData.some(
          (item) =>
            item.contactName == contactName && item.contactNo == contactNo
        )
      ) {
        setState((prevState) => ({
          ...prevState,
          val: "Please Update Any Field",
          opensnake: true,
        }));
      } else if (
        contactData.some(
          (item) => item.contactNo == contactNo && item._id != event
        )
      ) {
        setState((prevState) => ({
          ...prevState,
          val: "This No is Already Exists",
          opensnake: true,
        }));
      } else if (
        contactData.some(
          (item) => item.contactName == contactName && item._id != event
        )
      ) {
        setState((prevState) => ({
          ...prevState,
          val: "This Name is Already Exists",
          opensnake: true,
        }));
      } else {
        await contactRegisEdit({ contactName, contactNo, userId, event });
        await getContactDetail();
        setState((prevState) => ({
          ...prevState,
          val: "Contact Updated successfully",
          opensnake: true,
          errorConct: "",
          contactName: "",
          contactNo: "",
          contactAdd: false,
        }));
      }
    }
  };

  function deleteContact(event) {
    setState((prevState) => ({
      ...prevState,
      openModalForDelete: true,
      deleteCon: event,
    }));
  }
  //call from contact list
  const callDirect = (event) => {
    setState((prevState) => ({
      ...prevState,
      num: event,
      noChange: "true",
      call: "true",
      value: "1",
    }));
  };

  //call end function
  const callEnded = async () => {
    const currentPage = page + 1;
    setState((prevState) => ({
      ...prevState,
      loader: true,
    }));
    await disconnectTwilioCall(state, setState);
    setState((prevState) => ({
      ...prevState,
      call: "false",
    }));
    getCallData({ currentPage, uid, rowNum });
  };

  //find name for number
  function nameFind(num) {
    let contact = contactData.find(
      (item) =>
        item.userId === userTypeLogin[0]?._id && "+1" + item.contactNo === num
    );
    return contact;
  }

  //add contact icon
  const editUSerData = (data) => {
    const { contactName, _id, contactNo } = data;

    setState((prevState) => ({
      ...prevState,
      contactAdd: true,
      contactNo: contactNo,
      contactName: contactName,
      editDatas: _id,
    }));
  };
  function deleteContactD() {
    deleteContactDetail(deleteCon);
    setState((prevState) => ({
      ...prevState,
      openModalForDelete: false,
    }));
  }
  const plusIcon = () => {
    setState((prevState) => ({
      ...prevState,
      contactAdd: !contactAdd,
      errorConct: "",
      contactName: "",
      contactNo: "",
      editDatas: "false",
    }));
  };

  //logout from appliaction
  const logOut = () => {
    userLogout();
  };
  //fetch twilio token
  const fetchToken = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get-twilio-token"
      );
      setState((prevState) => ({
        ...prevState,
        tokenResponse: response.data.token,
      }));
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };
  const findData = callData.find(
    (item) => item.user_id == userTypeLogin[0]?._id
  );
  useEffect(() => {
    async function callRowApi() {
      const currentPage = page + 1;
      setState((prevState) => ({
        ...prevState,
        loader: true,
      }));
      if (!searchDataOfCaller && !searchDataOfDate) {
        await getCallData({ currentPage, uid, rowNum });
        await getCallLength(userTypeLogin[0]?._id);
      } else {
        handleAllFilter();
      }
      setState((prevState) => ({
        ...prevState,
        loader: false,
      }));
    }
    callRowApi();
  }, [rowNum]);
  useEffect(() => {
    getContactDetail();
    setState((prevState) => ({
      ...prevState,
      filterData: contactData,
    }));
  }, [val == "Contact Added successfully"]);

  useEffect(() => {
    if (!searchDataOfDate && !searchDataOfCaller) {
      const currentPage = page + 1;
      getCallLength(userTypeLogin[0]?._id);
      getCallData({ currentPage, uid, rowNum });
    }
  }, [searchDataOfCaller, searchDataOfDate]);
  //for add contact
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      filterData: contactData,
    }));
  }, [contactData]);
  //set contact search data
  useEffect(() => {
    if (!searchData) {
      getContactDetail();
    }
  }, [searchData]);

  useEffect(() => {
    if (!userTypeLogin[0]?._id) {
      navigate("/");
    }
    if (!searchDataOfCaller && !searchDataOfDate) {
      const currentPage = page + 1;
      getCallData({ currentPage, uid, rowNum });
    }
    if (searchData.length == 0) {
      getContactDetail();
      getAllContactData();
    }
    fetchToken();
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      filterData: contactData,
      filterCallsData: callData,
    }));
  }, [callData]);

  useEffect(() => {
    if (!userTypeLogin[0]?._id) {
      navigate("/");
    }
  }, [userTypeLogin]);

  useEffect(() => {
    async function callApi() {
      const currentPage = page + 1;
      setState((prevState) => ({
        ...prevState,
        loader: true,
      }));
      if (!searchDataOfCaller && !searchDataOfDate) {
        await getCallData({ currentPage, uid, rowNum });
        await getCallLength(userTypeLogin[0]?._id);
      } else {
        handleAllFilter();
      }
      setState((prevState) => ({
        ...prevState,
        loader: false,
      }));
    }
    callApi();
  }, [page]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      currentPage: 1,
    }));
  }, [filter]);

  useEffect(() => {
    async function getContact() {
      await getContactDetail();
      // await getCallData(currentPage);
      setState((prevState) => ({
        ...prevState,
        filterCallsData: callData,
      }));
    }
    getContact();
  }, [deleteUser]);

  useEffect(() => {
    async function callbut() {
      await callNow();
    }
    if (num.length == 12) {
      callbut();
    }
  }, [noChange == "true"]);

  return (
    <>
      <Box className="header" sx={{ flexGrow: 1 }}>
        <Dialog
          className="deleteModal"
          open={openModalForDelete}
          onClose={handleCloseModalD}
        >
         
            <DialogTitle className="deleteTitle" id="alert-dialog-title">
              {"Delete contact"}
            </DialogTitle>
            <DialogContent className="deleteTitle">Are you want to delete contact ?</DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModalD} className="buttonStyle">
                Cancel
              </Button>
              <Button onClick={deleteContactD} className="buttonStyle">
                Confirm
              </Button>
            </DialogActions>
         
        </Dialog>
        <Dialog open={openModalForUpdate} onClose={handleCloseModalUpdate}>
          <DialogTitle id="alert-dialog-title">
            <Typography className="passText">
              Enter old password to update new password
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoComplete="off"
              placeholder="Enter old password"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility(
                          "showUpdatePassCon",
                          showUpdatePassCon
                        )
                      }
                      value="showUpdatePass"
                    >
                      {showUpdatePassCon ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showUpdatePassCon ? "text" : "password"}
              onChange={setOldpassword}
              value={passwordOld}
              name="passwordOld"
              InputLabelProps={{ shrink: true }}
              variant="filled"
              className="inputButton"
              sx={{ mb: "10px" }}
            />

            <TextField
              fullWidth
              autoComplete="off"
              value={password}
              placeholder="Enter new Password"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility(
                          "showUpdatePass",
                          showUpdatePass
                        )
                      }
                      value="showUpdatePass"
                    >
                      {showUpdatePass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showUpdatePass ? "text" : "password"}
              name="password"
              onChange={setUserName}
              InputLabelProps={{ shrink: true }}
              variant="filled"
              className="inputButton"
              sx={{ mb: "10px" }}
            />

            <TextField
              fullWidth
              autoComplete="off"
              placeholder="Confirm password"
              value={passwordC}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility(
                          "showUpdatePassC",
                          showUpdatePassC
                        )
                      }
                      value="showUpdatePass"
                    >
                      {showUpdatePassC ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showUpdatePassC ? "text" : "password"}
              name="passwordC"
              onChange={setUserName}
              InputLabelProps={{ shrink: true }}
              variant="filled"
              className="inputButton"
              sx={{ mb: "10px" }}
            />
          </DialogContent>
          <Snackbar
            className="snkStyle"
            open={opensnakeForUpdPass}
            autoHideDuration={1500}
            onClose={handleCloseSnakeForUpdPass}
            action={action}
            style={{
              position: "absolute",
              left: "32%",
              transform: "translateX(-50%)",
              bottom: "3%",
            }}
          >
            <SnackbarContent
              style={{
                backgroundColor: "rgb(6, 128, 145)",
              }}
              message={<span id="client-snackbar1">{valPass}</span>}
            />
          </Snackbar>
          <DialogActions>
            <Button onClick={handleCloseModalUpdate} className="buttonStyle">
              Cancel
            </Button>
            <Button onClick={upDatePass} className="buttonStyle">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>User profile</DialogTitle>
          <DialogContent>
            <CText value={userName} change={setUserName} name="userName" />
            <CText value={email} name="email" change={setUserName} />
            <CText value={mobileNo} name="mobileNo" change={setUserName} />
            <Button onClick={updatePass}>Update Password</Button>
          </DialogContent>
          <Snackbar
            className="snkStyle"
            open={opensnakeForUpd}
            autoHideDuration={1500}
            onClose={handleCloseSnakeForUpd}
            action={action}
            style={{
              position: "absolute",
              left: "32%",
              transform: "translateX(-50%)",
              bottom: "3%",
            }}
          >
            <SnackbarContent
              style={{
                backgroundColor: "rgb(6, 128, 145)",
              }}
              message={<span id="client-snackbar1">{valC}</span>}
            />
          </Snackbar>
          <DialogActions>
            <Button onClick={handleCloseModal} className="buttonStyle">
              Cancel
            </Button>
            <Button onClick={updateUserProfile} className="buttonStyle">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={opensnake}
          autoHideDuration={1500}
          onClose={handleCloseSnake}
          action={action}
        >
          <SnackbarContent
            style={{
              backgroundColor: "rgb(6, 128, 145)",
            }}
            message={<span id="client-snackbar">{val}</span>}
          />
        </Snackbar>
        <Header
          clsName="appBar1"
          name={userTypeLogin[0]?.username}
          funName={ShowDropDown}
        />
      </Box>
      {ProfileStatus ? (
        <Grid className="profileSection">
          <Button className="profileDrop" onClick={showP}>
            Profile
          </Button>
          <Button className="profileDrop" onClick={logOut}>
            Logout
          </Button>
        </Grid>
      ) : null}
      {profileShowing ? (
        <Grid className="profile">
          <Grid className="pBack">
            <Avatar className="profileAvt">
              {" "}
              {userTypeLogin[0]?.username.slice(0, 1).toUpperCase()}
            </Avatar>
          </Grid>
          <MenuItem className="pMenu">
            <PersonOutlineIcon />{" "}
            <Typography className="pInfo">
              {" "}
              {userTypeLogin[0]?.username}
            </Typography>
          </MenuItem>
          <MenuItem className="pMenu">
            <MailOutlineIcon />{" "}
            <Typography className="pInfo">
              {" "}
              {userTypeLogin[0]?.email}
            </Typography>
          </MenuItem>
          <MenuItem className="pMenu">
            <PhoneIcon />{" "}
            <Typography className="pInfo">
              {" "}
              {userTypeLogin[0]?.mobile}
            </Typography>
          </MenuItem>
          <Button className="editData" onClick={editData}>
            Edit
          </Button>
        </Grid>
      ) : null}

      <Grid sm="8" md="8" xs="10">
        {loader ? <Loader /> : null}

        <Grid container className="filterField1">
          <Grid sm="3" md="1.3" xs="5" className="callHis">
            Call History
          </Grid>
          <Grid className="callButt" sm="3" md="1.5" xs="5">
            <Button
              className="callButon"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              <PhoneIcon className="callIcon" />
            </Button>
            <Popover
              className="popOver"
              id={id}
              open={open}
              anchorEl={state.anchorEl}
              onClose={handleClose}
              sx={{ maxeight: 540 }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ width: "290px", typography: "body1" }}>
                {call == "false" ? (
                  <TabContext className="tabContent" value={state.value}>
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

                        <BackspaceIcon
                          onClick={removeNum}
                          className="backSpace"
                        />
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
                      <Typography className="conatctList" variant="h6">
                        Contact List{" "}
                        {contactAdd ? (
                          <></>
                        ) : (
                          <Typography className="plus1" onClick={plusIcon}>
                            +
                          </Typography>
                        )}
                      </Typography>

                      <Paper style={{ height: 385, overflow: "auto" }}>
                        {contactAdd ? (
                          <Grid className="addConatct">
                            <TextField
                              fullWidth
                              autoComplete="off"
                              value={contactName}
                              placeholder="Enter name"
                              variant="filled"
                              className="inputButton"
                              sx={{ mb: "5px" }}
                              name="contactName"
                              InputProps={{ disableUnderline: true }}
                              InputLabelProps={{ shrink: true }}
                              onChange={setConatctDetail}
                            />
                            <TextField
                              fullWidth
                              placeholder="Enter phone No."
                              autoComplete="off"
                              variant="filled"
                              className="inputButton"
                              value={contactNo}
                              name="contactNo"
                              sx={{ mb: "5px" }}
                              InputProps={{ disableUnderline: true }}
                              InputLabelProps={{ shrink: true }}
                              onChange={setConatctDetail}
                            />
                            {errorConct ? (
                              <Typography className="errorMessage">
                                {errorConct}
                              </Typography>
                            ) : null}
                            <Stack
                              direction="row"
                              spacing={1}
                              className="btnForContact"
                            >
                              <Button
                                className="addContacts"
                                onClick={plusIcon}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="addContacts"
                                onClick={() => addPhoneNo(editDatas)}
                              >
                                Save
                              </Button>
                            </Stack>
                          </Grid>
                        ) : (
                          <>
                            <TextField
                              type="text"
                              placeholder="Search..."
                              onChange={searchItem}
                              fullWidth
                              className="contactSearch"
                              variant="outlined"
                              size="small"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className="sIcon"
                                    onClick={fiilterContactData}
                                  >
                                    <IconButton className="searchIcon">
                                      {" "}
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <List>
                              {filterData.length > 0 ? (
                                filterData
                                  .filter(
                                    (item) =>
                                      item.userId == userTypeLogin[0]?._id
                                  )
                                  .sort((a, b) =>
                                    a.contactName.localeCompare(b.contactName)
                                  )
                                  .map((eachCall) => (
                                    <ListItem className="contactItem">
                                      <ListItemText
                                        className="contactListShow"
                                        primary={eachCall.contactName}
                                        secondary={eachCall.contactNo}
                                      />
                                      <ListItemSecondaryAction>
                                        <Stack direction="row" spacing={0.007}>
                                          <IconButton
                                            edge="end"
                                            onClick={() =>
                                              deleteContact(eachCall._id)
                                            }
                                          >
                                            <DeleteIcon className="callIcon" />
                                          </IconButton>
                                          <IconButton
                                            edge="end"
                                            onClick={() =>
                                              editUSerData(eachCall)
                                            }
                                          >
                                            <EditIcon className="callIcon" />
                                          </IconButton>
                                          <IconButton
                                            edge="end"
                                            className="editIcc"
                                            onClick={() =>
                                              callDirect(
                                                "+1" + eachCall.contactNo
                                              )
                                            }
                                          >
                                            <PhoneIcon className="callIcon" />
                                          </IconButton>
                                        </Stack>
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  ))
                              ) : (
                                <Typography className="noRecord">
                                  No record exist
                                </Typography>
                              )}
                            </List>
                          </>
                        )}
                      </Paper>
                    </TabPanel>

                    <TabPanel className="tabForContact tabPanel" value="3">
                      <Paper style={{ height: 445, overflow: "auto" }}>
                        <TextField />
                        <TextField />
                      </Paper>
                    </TabPanel>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        centered
                      >
                        <Tab
                          className="icCall"
                          icon={<DialpadIcon className="tabIcon" />}
                          value="1"
                        />
                        <Tab
                          className="icCall"
                          icon={<PersonPinIcon className="tabIcon" />}
                          value="2"
                        />
                      </TabList>
                    </Box>
                  </TabContext>
                ) : (
                  <TabContext className="tabCall" value={state.value}>
                    <TabPanel className="tabCallPanell" value="1">
                      <Grid className="tabPanelForNum">
                        <Typography className="callName">
                          {contactData
                            .filter(
                              (item) =>
                                item.userId == userTypeLogin[0]?._id &&
                                item.contactNo == num.substring(2)
                            )
                            .map((matchingContact) =>
                              matchingContact ? (
                                <>{matchingContact.contactName}</>
                              ) : null
                            )}
                        </Typography>
                        <Typography className="numContain">{num}</Typography>
                        <Typography className="calling">
                          {callStatus} ...
                        </Typography>
                        <Grid container className="callOption">
                          <Grid sm="4.5" md="4.5" xs="4.5"></Grid>
                          <Grid sm="3" md="3" xs="3">
                            {mute == true ? (
                              <IconButton onClick={unmuteCall}>
                                <MicOffIcon />
                              </IconButton>
                            ) : (
                              <IconButton onClick={muteCall}>
                                <MicNoneIcon />
                              </IconButton>
                            )}

                            <Typography>Mute</Typography>
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
          <Grid sm="12" md="9" xs="12" className="allFilter">
            <TextField
              onChange={handlerDateFill}
              value={searchDataOfDate}
              InputLabelProps={{ shrink: true }}
              variant="filled"
              type="date"
              required
              className="inputButForSearch dateFilter"
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              type="text"
              value={searchDataOfCaller}
              placeholder="Search by Caller Name and No."
              onKeyUp={searchItemInCall}
              onChange={handleChanger}
              name="searchDataOfCaller"
              InputLabelProps={{ shrink: true }}
              variant="filled"
              className="inputButForSearch nameFilter"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment className="sIcon" position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              aria-describedby={id}
              variant="contained"
              className="filterButton"
              onClick={handleAllFilter}
            >
              Filter
            </Button>
            <Button
              aria-describedby={id}
              variant="contained"
              className="filterButton"
              onClick={handleFilterRemove}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
        <Grid className="accTab">
          <TableHead className="tableHeader">
            <TabRow />
          </TableHead>

          <Grid className="gridTb">
            {callData.length > 0 ? (
              callData
                .filter((item) => item.user_id == userTypeLogin[0]?._id)
                .map((eachCall, index) => {
                  var i = (page + 1 - 1) * rowNum + (index + 1);
                  var date = new Date(eachCall?.callTime);
                  var hour = date.getHours();
                  var mon = date.getMonth() + 1;
                  var min = date.getMinutes();
                  var dat = date.getDate();
                  if (dat < 10) {
                    dat = "0" + dat;
                  }
                  if (min < 10) {
                    min = "0" + min;
                  }
                  if (mon < 10) {
                    mon = "0" + mon;
                  } else {
                    mon = mon;
                  }

                  const isCallConnected =
                    eachCall.hasOwnProperty("recordingUrl");

                  return (
                    <Accordion
                      expanded={expanded === eachCall.callId}
                      onChange={handleChanged(eachCall.callId)}
                      disabled={!isCallConnected}
                      className="responsiveAccordion"
                    >
                      <AccordionSummary
                        aria-controls="panel1bh-content"
                        className="muiSum"
                        id="panel1bh-header"
                      >
                        <Typography
                          className="tableEntry"
                          sx={{ width: "10%", flexShrink: 0 }}
                        >
                          {i}
                        </Typography>
                        <Typography
                          className="tableEntry"
                          sx={{ width: "17%" }}
                        >
                          {eachCall.from}
                        </Typography>
                        <Typography
                          className="tableEntry"
                          sx={{ width: "17%" }}
                        >
                          {/* {eachCall.to} */}
                          {nameFind(eachCall.to) ? (
                            <>
                              <Typography
                                className="callHisContactName"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {nameFind(eachCall.to).contactName}
                              </Typography>
                              <Typography className="callHisContactName">
                                {" "}
                                {eachCall.to}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography className="callHisContactName">
                                Unknown No.
                              </Typography>
                              <Typography className="callHisContactName">
                                {eachCall.to}
                              </Typography>
                            </>
                          )}
                          {/* {contact ? contact.contactName : eachCall.to} */}
                        </Typography>
                        <Typography
                          className="tableEntry"
                          sx={{ width: "18%" }}
                        >
                          {dat + "-" + mon + "-" + date.getFullYear()}
                        </Typography>
                        <Typography
                          className="tableEntry"
                          sx={{ width: "14%" }}
                        >
                          {hour + ":" + min}
                        </Typography>
                        {eachCall.hasOwnProperty("recordingUrl") ? (
                          <Typography
                            className="tableEntry"
                            // sx={{ width: "25%" }}
                          >
                            {eachCall?.RecordingDuration + " sec"}{" "}
                          </Typography>
                        ) : (
                          <Typography
                            className="tableEntry"
                            sx={{ width: "14%" }}
                          >
                            0 sec{" "}
                          </Typography>
                        )}
                        {eachCall.hasOwnProperty("recordingUrl") ? (
                          <Typography className="recorUrl">
                            <PlayCircleIcon />{" "}
                          </Typography>
                        ) : (
                          <Typography
                            className="tableEntry"
                            sx={{ width: "8%" }}
                          >
                            Not connect
                          </Typography>
                        )}
                      </AccordionSummary>
                      <AccordionDetails className="recoUrl">
                        <audio controls className="audioClass" muted={false}>
                          <source
                            className="audioC"
                            src={eachCall.recordingUrl}
                            type="audio/mpeg"
                          />
                        </audio>
                      </AccordionDetails>
                    </Accordion>
                  );
                  i = i + 1;
                })
            ) : (
              <Grid className="noRecord1">No Record Exists</Grid>
            )}
          </Grid>
        </Grid>
        <Grid>
          <TablePagination
            component="div"
            className="pageNation"
            count={callDataLength}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowNum}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
    callData: state?.user1?.callData,
    tokenData: state?.user1?.tokenData,
    contactStatus: state?.user1?.contactStatus,
    contactData: state?.user1?.contactData,
    contactDatas: state?.user1?.contactDatas,
    deleteUser: state?.user1?.deleteUser,
    callDataLength: state?.user1?.callDataLength,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      userLogout,
      getCallData,
      contactRegis,
      getData,
      getContactDetail,
      filterContactApiData,
      updateUserProfileSection,
      filterContactApiDataByNo,
      deleteContactDetail,
      filterByNumberAndDate,
      getCallHisdataByDateAndName,
      getAllContactData,
      filterByNumber,
      filterByDate,
      getCallHisdata,
      getCallLength,
      contactRegisEdit,
      setNoRecord,
    },

    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallHistory);
