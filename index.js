const http = require("http");
const httpProxy = require("http-proxy");
const url = require("url");

const sandbox = {
  THANAL_URL: "[2403:a080:c04:46b0:4c48:38f1:e8ab:dbe]",
  THANAL_NEXT_PORT: 3000,
  THANAL_API_PORT: 5000,
};
const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log(`Incoming request: ${req?.method} ${parsedUrl?.path}`);
  if (req.method === "GET" && parsedUrl.pathname === "/updateAddress") {
    const ipv6 = parsedUrl?.query?.address;
    sandbox.THANAL_URL = `[${ipv6}]`;
    const responseData = { message: "Successfully updated url", ipv6 };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(responseData));
  }
  proxy.web(req, res, {
    target: 'https://google.com',
  });
});
proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err);
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("Proxy Error");
});

// Listen for server errors
server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(8000);

console.log("Tunnel server running on port 8000");
