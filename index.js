const express = require("express");
const proxy = require("express-http-proxy");
const sandbox = {};
const app = express();
const targetURL = "www.google.com";
const proxyMiddleware = proxy(targetURL);
app.use("/", proxyMiddleware);
const port = 8000;
app.listen(port, () => {
  console.log(`Proxy server started on port ${port}`);
});
