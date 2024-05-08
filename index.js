const os = require('os');

const interfaces = os.networkInterfaces();
console.log("ip details", JSON.stringify(interfaces))
// const wifi = interfaces?.["Wi-Fi"]?.find(items=> items.family === 'IPv6' && !items.internal && (items.cidr.includes("/64") || items.cidr.includes("/128")));
// if (wifi) {
//     console.log("ipv6 : ", wifi.address)
// }
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
