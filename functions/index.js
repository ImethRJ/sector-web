const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");

setGlobalOptions({ maxInstances: 10 });

const app = express();

// 1. Explicitly allow fonts and styles to fix the "default-src 'none'" error
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; font-src 'self' https://sector-institute.web.app data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:;"
    );
    next();
});

// 2. Prerender.io Middleware
app.use(require('prerender-node')
    .set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG') 
);

// 3. Serve the Static React App
app.get("*", (req, res) => {
    // We use path.resolve to ensure the path is absolute and correct
    const indexPath = path.resolve(__dirname, '../dist/index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Error sending index.html:", err);
            res.status(404).send("Site files not found. Please check deployment.");
        }
    });
});

exports.ssr = onRequest(app);