const Twilio = require("twilio-client");
let device = new Twilio.Device();
export function getTwilioDeviceReady(
  tokenResponse,
  state,
  setState,
  getCallData,
  page,
  rowNum,
  getCallLength,
  uid
) {
  // console.log("twilio", state);
  if (state.tokenResponse) {
    device.setup(state.tokenResponse, {
      codecPreferences: ["opus", "pcmu"],
      maxAverageBitrate: 16000,
      debug: true,
      enableRingingState: true,
    });
  }
  setState((prevState) => ({
    ...prevState,
    call: "true",
  }));

  device.on("disconnect", function (connection) {
    setState((prevState) => ({
      ...prevState,
      callStatus: "cut",
      loader: true,
      noChange: "",
    }));

    device.disconnectAll();
    setTimeout(getCall, 3000);
    setState((prevState) => ({
      ...prevState,
      call: "false",
      callStatus: "idle",
      num: "+1",
      searchDataOfCaller: "",
      searchDataOfDate: "",
    }));
  });
  function getCall() {
    const currentPage =page+1;
    getCallData({ currentPage,page,rowNum, uid });
    getCallLength(uid);
    setState((prevState) => ({
      ...prevState,
      loader: false,
    }));
  }

  device.on("error", function (error) {
    // console.log("error", error, error?.message.length);
    if (error.code === 31205 || error.code === 31000 || error.code === 31005) {
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
  });
  return device;
}

export async function disconnectTwilioCall(state, setState) {
  await device.disconnectAll();
  setState((prevState) => ({
    ...prevState,
    num: "+1",
    callStatus: "cut",
    noChange: "",
  }));
  if (state.unSubscribeListener) state.unSubscribeListener();
}
export function muteTwilioCall(mute, state, setState) {
  const activeConnection = device.activeConnection();
  if (activeConnection) {
    if (mute) {
      activeConnection.mute();
      setState((prevState) => ({
        ...prevState,
        mute: true,
      }));
    } else {
      activeConnection.unmute();
      setState((prevState) => ({
        ...prevState,
        mute: false,
      }));
      // console.log("Call unmuted.");
    }
  } else {
    console.log("No active call to mute/unmute.");
  }
}
export function getTwilioStatus() {
  try {
    return device.status();
  } catch (e) {
    console.log("error", e);
  }
}
export function outGoing(state, setState, userId) {
  const connection = device.connect({
    to: state.num,
    from: "+12073583970",
    userId: userId,
  });

  connection.on("ringing", () => {
    // console.log("connection in ringing", connection);
    // console.log("this is ringing side");
    // console.log("status is");
    setState((prevState) => ({
      ...prevState,
      callStatus: "calling",
    }));
  });
  connection.on("accept", async (connect) => {
    await console.log("connection in accept", connect);
    setState((prevState) => ({
      ...prevState,
      callStatus: "connected",
    }));
  });
}
