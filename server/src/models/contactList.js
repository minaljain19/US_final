const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  contactNo: {
    type: String,
    required: true,
  
  },
  userId: {
    type: String,
    required: true,
  },
});
const Contact = new mongoose.model("contact", contactSchema);
module.exports = Contact;
