const http = require("http");
const httpProxy = require("http-proxy");
const url = require("url");

const sandbox = {
  THANAL_URL: "localhost",
  THANAL_NEXT_PORT: 3000,
  THANAL_API_PORT: 5000,
};
const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    console.log(`Incoming request: ${req.method} ${parsedUrl.path}`);
    if (
      req.method === "GET" &&
      parsedUrl.pathname.startsWith("/images/getImage")
    ) {
      proxy.web(req, res, {
        target: `http://${sandbox.THANAL_URL}:${sandbox.THANAL_API_PORT}`,
      });
    } else {
      proxy.web(req, res, {
        target: `http://${sandbox.THANAL_URL}:${sandbox.THANAL_NEXT_PORT}`,
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err);
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("Proxy Error");
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(80);

console.log("Tunnel server running on port 8000");
