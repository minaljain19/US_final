const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/USCalling", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("fullfil");
  })
  .catch((e) => {
    console.log(e);
  });
console.log("hello");
