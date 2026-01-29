const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");

// Configuration: Max 10 instances
setGlobalOptions({ maxInstances: 10 });

const app = express();

// 1. Fix Security Policy (CSP)
// This allows your fonts (Poppins) and internal styles to load
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; font-src 'self' https://sector-institute.web.app; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:;"
    );
    next();
});

// 2. Prerender.io Middleware
app.use(require('prerender-node')
    .set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG') 
);

// 3. Serve the Static React App
app.get("*", (req, res) => {
    // Send the built index.html for all routes (fixes the 404 on subpages)
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 4. Export the Function
exports.ssr = onRequest(app);