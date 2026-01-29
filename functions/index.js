const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");
const axios = require('axios');

setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(express.json()); // Essential to parse the body from your React fetch

// 1. Updated Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob:; connect-src *;"
    );
    next();
});

// 2. IndexNow Proxy Route - MUST be above app.get("*")
app.post("/api/indexnow", async (req, res) => {
    try {
        const response = await axios.post("https://api.indexnow.org/indexnow", req.body);
        console.log("IndexNow Success:", response.status);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("IndexNow Proxy Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to notify IndexNow" });
    }
});

// 3. Serve Static Assets
app.use(express.static(path.join(__dirname, 'site')));

// 4. Prerender.io Middleware
app.use(require('prerender-node').set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG'));

// 5. Serve the Static React App (Wildcard MUST be last)
app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, 'site', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(404).send("Site files not found.");
        }
    });
});

exports.ssr = onRequest(app);