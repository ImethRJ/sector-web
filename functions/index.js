const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");
const helmet = require("helmet");

// Configuration: Max 10 instances to manage costs
setGlobalOptions({ maxInstances: 10 });

const app = express();

// 1. Security & CSP Configuration
// This fixes the "default-src 'none'" error by allowing self-hosted fonts and styles
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true, // Start with safe defaults
      directives: {
        "default-src": ["'self'"],
        "font-src": ["'self'", "https://sector-institute.web.app", "https://fonts.gstatic.com"], 
        "style-src": ["'self'", "'unsafe-inline'", "https://sector-institute.web.app"],
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "img-src": ["'self'", "data:", "https://sector-institute.web.app"],
        "upgrade-insecure-requests": [], // Ensure all traffic is HTTPS
      },
    },
  })
);

// 2. Prerender.io Middleware Integration
app.use(require('prerender-node')
    .set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG') 
);

// 3. Serve the Static React App
// This handles routing for /all-tutors, /sector19365, and all other sub-pages
app.get("*", (req, res) => {
    // Points to the built index.html in the 'dist' folder
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 4. Export the Function as 'ssr'
exports.ssr = onRequest(app);