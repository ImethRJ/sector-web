const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");

// Configuration: Max 10 instances to manage costs
setGlobalOptions({ maxInstances: 10 });

const app = express();

// 1. Updated Security Policy (CSP)
// Now allows Poppins fonts from your domain and Google Fonts
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; font-src 'self' https://sector-institute.web.app data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:;"
    );
    next();
});

// 2. Prerender.io Middleware
app.use(require('prerender-node')
    .set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG') 
);

// 3. Serve the Static React App
app.get("*", (req, res) => {
    /**
     * Path Resolution: 
     * In the cloud, the 'dist' folder must be deployed alongside functions.
     * We look for it in the parent directory relative to this script.
     */
    const indexPath = path.resolve(__dirname, '../dist/index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Critical Deployment Error: index.html not found at", indexPath);
            res.status(404).send("Site files not found. Please check deployment.");
        }
    });
});

// 4. Export the Function as 'ssr'
exports.ssr = onRequest(app);