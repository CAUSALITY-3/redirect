// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// // Define your proxy target
// const target = 'http://localhost:3000'; // Change this to your target URL

// // Create the proxy middleware
// const proxyMiddleware = createProxyMiddleware({
//     target,
//     changeOrigin: true, // Needed for virtual hosted sites
//     logLevel: 'debug', // Optional: set to 'debug' for more detailed logs
// });

// // Apply the proxy middleware for all HTTP methods
// app.use('/*', proxyMiddleware);

// // Start the server
// const PORT = 4000;
// app.listen(PORT, () => {
//     console.log(`Proxy server is running on port ${PORT}`);
// });

const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

// Replace these values with your local server's host and port
const LOCAL_SERVER_HOST = 'localhost';
const LOCAL_SERVER_PORT = 3000;

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create an HTTP server
http.createServer((req, res) => {
    // Parse the request URL
    const reqUrl = url.parse(req.url);

    // Log the incoming request
    console.log(`Incoming request: ${req.method} ${reqUrl.path}`);

    // Proxy the request to the local server
    proxy.web(req, res, { target: `http://${LOCAL_SERVER_HOST}:${LOCAL_SERVER_PORT}` });
}).listen(8000); // Port for your tunnel server

console.log('Tunnel server running on port 8000');

