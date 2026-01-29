const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");

// Configuration: Max 10 instances to manage costs per your original setup
setGlobalOptions({ maxInstances: 10 });

const app = express();

// 1. Prerender.io Middleware Integration
// This intercepts crawler requests (Bing, Google, etc.) and routes them to Prerender.io
app.use(require('prerender-node')
    .set('prerenderToken', 'xV3xxGRXT1mbc3fTwloG') // <-- Replace with your real token from Prerender.io
);

// 2. Serve the Static React App
// This tells the function where to find your 'index.html' file to serve it to normal users
app.get("*", (req, res) => {
    // Note: Adjust the path below to point to where your build files are (usually '../public/index.html')
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 3. Export the Function as 'ssr'
// You will reference this name in your firebase.json rewrites
exports.ssr = onRequest(app);