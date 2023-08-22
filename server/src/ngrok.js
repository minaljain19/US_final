const ngrok = require("ngrok");
(async function () {
  const url = await ngrok.connect(5000);
  console.log("Tunnel URL:", url);

  // You can now share the `url` with others to access your local server.
})();
