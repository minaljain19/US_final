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
const CallHis = require("./models/callHis");
const port = process.env.port || 5000;
const cors = require("cors");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const AccessToken = require("twilio").jwt.AccessToken;
var accountSid = "AC4887b08c580283cccd6fbf4d7280ff9b";
var authToken = "9d2ff6d47579ba749ee8d0708181b866";
const sid = "SK09c8c07532d9bf08292a81b55c83d461";
const secret = "U05A0cWHTRT2SEC3BcbTRpNfQU2wpaoN";
const identity = "minalpagaria@gmail.com";
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/callHistory", async (req, res) => {
  try {
    const data1 = await CallHis.find({});
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
    outgoingApplicationSid: "APcc2ce3dc1dc3d1b038c6b491a380c959", // Replace with your TwiML App SID
    incomingAllow: true,
    outgoingApplicationParams: {
      applicationSid: "APcc2ce3dc1dc3d1b038c6b491a380c959",
    }, // Allow incoming calls
  });
  token.addGrant(grant);
  console.log("sd", token.toJwt());

  res.json({ token: token.toJwt() });
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (req.body.email && req.body.password) {
      let user = await User.findOne(req.body).select("-password");
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

app.post("/callHistory", async (req, res) => {
  try {
    console.log(req.body);
    const { _id, callId, from, to, status, callTime, duration, action } =
      req.body;
    const call = new CallHis(req.body);
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
app.post("/recording-callback", async (req, res) => {
  try {
    const recordingStatus = req.body.RecordingStatus;
    const recordingSid = req.body.RecordingSid;
    const recordingUrl = req.body.RecordingUrl;

    console.log("Recording Status:", recordingStatus);
    console.log("Recording SID:", recordingSid);
    console.log("Recording URL:", recordingUrl);

    res.status(200).send("Recording callback received.");
  } catch (e) {
    console.error("Error handling recording callback:", e);
    res.status(500).send(e);
  }
});

app.post("/api/call-back/:to/", async (req, res) => {
  console.log("req", req);
});
app.post("/api/make-call/:to/", async (req, res) => {
  try {
    console.log("call init");
    console.log("req call no", req.body);
    console.log("end");
    const ClientCapability = require("twilio").jwt.ClientCapability;
    // const capability = new ClientCapability({
    //   accountSid: accountSid,
    //   authToken: authToken,
    // });
    // capability.addScope(
    //   new ClientCapability.OutgoingClientScope({ applicationSid: "APcc2ce3dc1dc3d1b038c6b491a380c959" })
    // );
    // const token = capability.toJwt();
    const { toNumber, fromNumber } = req.body;
    const twiml = new VoiceResponse();
    twiml.say("Hello! This is a sample call using TwiML.");
    // twiml.dial("+12054190332");
    const dial = twiml.dial({
      callerId: "+15188726700",
      record: "record-from-ringing-dual",
      recordingStatusCallback: "/recording-callback",
    });
    dial.number(req.body.to);
    // res.json(twiml);
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
