const express = require("express");
const proxy = require("express-http-proxy");
const sandbox = {};
const app = express();
const targetURL = "http://[2403:a080:c04:46b0:4c48:38f1:e8ab:dbe]:3000";
const proxyMiddleware = proxy(targetURL);
app.use("/", proxyMiddleware);
const port = 8000;
app.listen(port, () => {
  console.log(`Proxy server started on port ${port}`);
});
