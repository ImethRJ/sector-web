const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");
const axios = require('axios');

setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(express.json());

// 0. Domain Redirection (User Request: Fix Redirect Loop)
app.use((req, res, next) => {
    const host = req.get('host');
    const xForwardedHost = req.get('x-forwarded-host');

    // Debug log to check what the server sees
    console.log('Domain Redirect Debug:', { host, xForwardedHost, url: req.url });

    const isOldDomain = (h) => h && (h.includes('sector-institute.web.app') || h.includes('sector-institute.firebaseapp.com'));

    if (isOldDomain(host) || isOldDomain(xForwardedHost)) {
        console.log('Redirecting to sectorinstitute.lk');
        return res.redirect(301, `https://sectorinstitute.lk${req.url}`);
    }
    next();
});

// 1. Security Policy
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob:; connect-src *;"
    );
    next();
});

// 2. IndexNow Proxy Route (Crucial: Must be before static/wildcard routes)
app.post("/api/indexnow", async (req, res) => {
    try {
        const response = await axios.post("https://api.indexnow.org/indexnow", req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("IndexNow Proxy Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to notify IndexNow" });
    }
});

// 3. Serve Static Assets from 'site' folder (Created during predeploy)
app.use(express.static(path.join(__dirname, 'site')));

// 4. Prerender.io Middleware
app.use(require('prerender-node').set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG'));

// 5. Wildcard Route: Serve index.html for all other paths
app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, 'site', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Index.html not found at", indexPath);
            res.status(404).send("Site files not found.");
        }
    });
});

exports.ssr = onRequest(app);