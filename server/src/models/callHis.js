const mongoose = require("mongoose");
const validator = require("validator");
const callSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  callId: { type: String, required: true },
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  callTime: { type: String, required: true },
  duration: { type: String, required: true },
  action: { type: String, required: true },
});
const CallHis = new mongoose.model("CallHis", callSchema);
module.exports = CallHis;