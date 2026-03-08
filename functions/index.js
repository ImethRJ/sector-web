const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const axios = require('axios');

setGlobalOptions({ maxInstances: 10, region: "asia-south1" });

const app = express();
app.use(express.json());

// 0. Domain Redirection
app.use((req, res, next) => {
    // ... (keep existing redirection logic if needed, or rely on original)
    const host = req.get('host');
    const xForwardedHost = req.get('x-forwarded-host');
    const isOldDomain = (h) => h && (h.includes('sector-institute.web.app') || h.includes('sector-institute.firebaseapp.com'));
    if (isOldDomain(host) || isOldDomain(xForwardedHost)) {
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

// 2. IndexNow Proxy Route
app.post("/api/indexnow", async (req, res) => {
    // ... (keep existing)
    try {
        const response = await axios.post("https://api.indexnow.org/indexnow", req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("IndexNow Proxy Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to notify IndexNow" });
    }
});

exports.ssr = onRequest(app);