const http = require("http");
const WebSocket = require("ws");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const twilio = require("twilio");
require("./db/connect");
const User = require("./models/userData");
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
var client = require("twilio")(accountSid, authToken);

const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
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

  // token.addGrant(chatGrant);

  // Serialize the token to a JWT string
  console.log(token.toJwt());
  // client.calls.create(
  //   {
  //     url: "http://demo.twilio.com/docs/voice.xml",
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
  res.json({ token: token.toJwt() });
});
app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (req.body.email && req.body.password) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        console.log(user);

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

app.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    const { email, mobile } = req.body;
    const user = new User(req.body);
    const userStats = await user.save();
    console.log("hello");
    console.log(userStats);
    res.status(201).send(userStats);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/api/make-call", async (req, res) => {
  try {
    const { toNumber, fromNumber } = req.body;
    console.log(req.body);
    // Create a TwiML response
    const twiml = new VoiceResponse();
    twiml.say("Hello! This is a sample call using TwiML.");
    twiml.dial(
      {
        callerId: fromNumber,
      },
      toNumber
    ); 

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

// wss.on("connection", (ws) => {
//   console.log("SD");
//   ws.on("message", async (message) => {
//     const { to, from } = JSON.parse(message);
//     const call = await client.calls.create({
//       twiml:
//         '<Response><Dial callerId="' + from + '">' + to + "</Dial></Response>",
//       to: to,
//       from: from,
//     });

//     ws.send(JSON.stringify({ callSid: call.sid }));
//   });
// });
