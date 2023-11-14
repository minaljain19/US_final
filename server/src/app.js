const http = require("http");
const WebSocket = require("ws");
const ngrok = require("ngrok");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const twilio = require("twilio");
require("./db/connect");
const User = require("./models/userData");
const Contact = require("./models/contactList");
const CallHis = require("./models/callHis");
const port = process.env.port || 5000;
const cors = require("cors");
const server = http.createServer(app);
const AccessToken = require("twilio").jwt.AccessToken;
var accountSid = "AC1a3f2a88a3ccd63367c2e7d887047561";
var authToken = "c0a95e272e55a5dc4c6ee5561082a0a2";
const sid = "SKd440a9c933c36c6a9c999de310061540";
const secret = "NwHOFceb2xWIcl7OuUu2JiCUz8IBOq47";
const identity = "minal.pagaria@kadellabs.com";
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/callHistoryLen", async (req, res) => {
  try {
    const { user_id, callTime, to } = req.query;
    console.log("status", user_id);

    const filter = {};
    if (user_id) {
      filter.user_id = user_id;
    }
    if (callTime) {
      filter.callTime = { $regex: callTime, $options: "i" };
    }
    if (to) {
      filter.to = { $regex: to, $options: "i" };
    }
    const data1 = await CallHis.find(filter);
    console.log("DS", data1);
    res.status(201).json(data1);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.get("/callHistory", async (req, res) => {
  try {
    const { user_id, callTime, to, page, pageSize } = req.query;
    console.log("status", user_id, to, callTime);
    const skip = (page - 1) * pageSize;
    const filter = {};
    if (user_id) {
      filter.user_id = user_id;
    }
    if (callTime) {
      filter.callTime = { $regex: callTime, $options: "i" };
    }
    if (to) {
      filter.to = { $regex: to, $options: "i" };
    }

    const data1 = await CallHis.find(filter)
      .sort({ callTime: -1 })
      .skip(skip)
      .limit(pageSize);
    console.log("DS", data1);
    res.status(201).json(data1);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.get("/user", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(201).json(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/api/get-twilio-token", (req, res) => {
  const client = twilio(accountSid, authToken);
  const token = new AccessToken(accountSid, sid, secret, {
    identity: identity,
  });
  const grant = new twilio.jwt.AccessToken.VoiceGrant({
    outgoingApplicationSid: "APae027092032f832d42fe5f419f53ddf2", // Replace with your TwiML App SID
    incomingAllow: true,
    outgoingApplicationParams: {
      applicationSid: "APae027092032f832d42fe5f419f53ddf2",
    }, // Allow incoming calls
  });
  token.addGrant(grant);
  console.log("sd", token.toJwt());

  res.json({ token: token.toJwt() });
});
app.post("/UpdatePassword", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (req.body.email && req.body.password) {
      let updateUser = await User.findOneAndUpdate(
        { email },
        { $set: { password: password } },
        { new: true }
      );
      if (updateUser) {
        res.status(201).send(updateUser);
      } else {
        res.json({ result: "Not Found email" });
      }
    } else {
      res.send({ result: "not update" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (req.body.email && req.body.password) {
      let user = await User.findOne(req.body);
      if (user) {
        res.status(201).send(user);
      } else {
        res.json({ result: "not found" });
      }
    } else {
      res.send({ result: "enter" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
app.post("/api/call-back/:to/:userId", async (req, res) => {
  const { to } = req.params.to; // Extract 'to' from URL parameters
  // console.log("Received callback for 'to':", req.params.to, req.params.userId);
  console.log("call back response");
  console.log("req", req.body);
  try {
    // const { _id, CallSid, from, to, status, callTime, CallDuration, action } =
    //   req.body;
    //       const { _id, callId, from, to, status, callTime, duration, action } =
    //   req.body;
    const utcDate = new Date(req.body.Timestamp);
    const istDate = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata", // 'Asia/Kolkata' is the IANA time zone identifier for IST
    });
    // console.log("new time", istDate);
    // const objj = {
    //   user_id: req.params.userId,
    //   callId: req.body.CallSid,
    //   from: "+12073583970",
    //   to: req.params.to,
    //   callTime: istDate,
    //   duration: req.body.CallDuration,
    //   action: req.body.CallStatus,
    // };
    // const call = new CallHis(objj);

    // const callStats = await call.save();
    // console.log("idd",req.body.CallSid)
    const filter = {
      callId: req.body.CallSid,
    };

    const update = {
      callTime: istDate,
      duration: req.body.CallDuration,
      action: req.body.CallStatus,
    };

    const callStats = await CallHis.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log("hello", callStats);

    res.status(201).send(callStats);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.post("/callHistory", async (req, res) => {
  try {
    console.log(req.body);
    const { _id, callId, from, to, status, callTime, duration, action } =
      req.body;
    const call = new CallHis(req.body);
    console.log("call idd", callId);
    const callStats = await call.save();
    console.log("hello");
    console.log(callStats);
    res.status(201).send(callStats);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.post("/user", async (req, res) => {
  try {
    const { email, mobile } = req.body;
    const user = new User(req.body);
    const userStats = await user.save();
    res.status(201).send(userStats);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.post("/updateUser", async (req, res) => {
  try {
    const { _id, username, email, mobile, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { username, mobile, email, password },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    console.log(updatedUser);
    res.status(200).send(updatedUser);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.post("/contactListEdit", async (req, res) => {
  try {
    const { contactName, contactNo, _id } = req.body;
    console.log("df", contactName, _id);
    const updatedUser = await Contact.findByIdAndUpdate(
      _id,
      { contactName, contactNo },
      { new: true } // This option returns the updated document
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    console.log(updatedUser);
    res.status(200).send(updatedUser);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.post("/contactList", async (req, res) => {
  try {
    const { contactName, contactNo, userId } = req.body;
    const contact = new Contact(req.body);
    const contactStats = await contact.save();
    console.log(contactStats);
    res.status(201).send(contactStats);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete("/deleteById", async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const contact = await Contact.findById(_id);
    if (!contact) {
      return res.status(404).json({ message: "User not found" });
    }

    await Contact.findByIdAndDelete(_id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
});

app.get("/contactList", async (req, res) => {
  try {
    const { contactName, contactNo, userId } = req.query;
    console.log("status", contactName, contactNo, userId);
    const filter = {};
    if (userId) {
      filter.userId = userId;
    }
    if (contactName) {
      filter.contactName = { $regex: contactName, $options: "i" };
    }
    if (contactNo) {
      const contactNoStr = contactNo.toString();
      filter.contactNo = { $regex: contactNoStr, $options: "i" };
    }
    const data = await Contact.find(filter);
    res.status(201).json(data);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.post("/callBack", async (req, res) => {
  console.log("res data djs", req.body);
  res.status(200).send("Callback received.");
});
app.post("/recording-callback", async (req, res) => {
  try {
    // console.log("allres", req.body);
    const recordingStatus = req.body.RecordingStatus;
    const recordingSid = req.body.RecordingSid;
    const recordingUrl = req.body.RecordingUrl;
    console.log("Recording Status:", recordingStatus);
    console.log("Recording SID:", recordingSid);
    console.log("Recording URL:", recordingUrl);
    const updatedCall = await CallHis.findOneAndUpdate(
      { callId: req.body.CallSid },
      {
        recordingUrl: req.body.RecordingUrl,
        RecordingDuration: req.body.RecordingDuration,
      }
    );
    console.log("update", updatedCall);
    res.status(200).send("Recording callback received.");
  } catch (e) {
    console.error("Error handling recording callback:", e);
    res.status(500).send(e);
  }
});
app.post("/api/make-call/:to/", async (req, res) => {
  try {
    const obj = {
      user_id: req.body.userId,
      callId: req.body.CallSid,
      from: req.body.from,
      to: req.body.to,
      callTime: " ",
      duration: " ",
      action: req.body.CallStatus,
    };
    const call = new CallHis(obj);
    const callStats = await call.save();
    console.log("this is", callStats);
    console.log("call init");
    console.log("req call no", req.body);
    console.log("end");
    const ClientCapability = require("twilio").jwt.ClientCapability;
    const actionCallbackUrl = `/api/call-back/${req.body.to}/${req.body.userId}`;
    console.log("action callback URL", actionCallbackUrl);
    const twiml = new VoiceResponse();
    twiml.say("Hello! This is a sample call using TwiML.");
    // twiml.dial("+12054190332");
    const dial = twiml.dial({
      callerId: "+12073583970",
      record: "record-from-answer",
      recordingStatusCallback: "/recording-callback",
      statusCallbackEvent: "initiated ringing answered completed",
      statusCallback: "/callBack",
      statusCallbackMethod: "POST",
      action: actionCallbackUrl,
    });
    dial.number(req.body.to);
    res.set("Content-Type", "text/xml");
    res.send(twiml.toString()); // Send the TwiML response
  } catch (e) {
    console.error("Error making call:", e);
    res.status(500).send(e);
  }
});
app.listen(port, () => {
  console.log("listen to server");
});

// client.calls.create(
//   {
//     url: "https://demo.twilio.com/welcome/voice/",
//     to: "+12054190332",
//     from: "+15188726700",
//   },
//   function (err, call) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(call.sid);
//     }
//   }
// );
