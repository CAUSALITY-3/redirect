const http = require("http");
const axios = require("axios");
const url = require("url");

const sandbox = {
  THANAL_URL: "localhost",
  THANAL_NEXT_PORT: 3000,
  THANAL_API_PORT: 5000,
};
const cache = {};
const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    console.log(`Incoming request: ${req.method} ${parsedUrl.path}`);
    const cacheKey = req.method + parsedUrl.path;
    const cacheData = cache[cacheKey];
    if (cacheData) {
      console.log("From cache, &&&&&&&&&&");
      res.end(cacheData);
    } else {
      const targetUrl = `http://${sandbox.THANAL_URL}:${sandbox.THANAL_NEXT_PORT}${parsedUrl.path}`;
      const response = await axios({
        method: req.method,
        url: targetUrl,
        headers: req.headers,
        data: req.body,
        responseType: "arraybuffer",
      });
      res.writeHead(response.status, response.headers);
      res.end(response.data);
      console.log("Adding to cache", parsedUrl.path);
      cache[cacheKey] = response.data;
    }
  } catch (error) {
    console.log(error);
    console.log("Error: ", req.url);

    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(80);

console.log("Tunnel server running on port 80");
