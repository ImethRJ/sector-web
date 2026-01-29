const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");

// Configuration: Max 10 instances to manage costs per your original setup
setGlobalOptions({ maxInstances: 10 });

const app = express();

// 1. Prerender.io Middleware Integration
// Intercepts crawlers (Bing, Google) to serve pre-rendered HTML snapshots
app.use(require('prerender-node')
    .set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG') 
);

// 2. Serve the Static React App
// This serves your actual React app to normal students and visitors
app.get("*", (req, res) => {
    // CORRECTED: Pointing to '../dist/index.html' to match your build output
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 3. Export the Function as 'ssr'
exports.ssr = onRequest(app);