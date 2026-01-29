const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");
const axios = require('axios');

// Configuration: Max 10 instances
setGlobalOptions({ maxInstances: 10 });

const app = express();

// 1. Updated Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob:; connect-src *;"
    );
    next();
});

// 2. Serve Static Assets (CSS, JS, Images) from the 'site' folder
/** * Since firebase.json copies 'dist' to 'functions/site', 
 * we serve static assets from the internal 'site' path.
 */
app.use(express.static(path.join(__dirname, 'site')));

// 3. Prerender.io Middleware
app.use(require('prerender-node')
    .set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG') 
);

// 4. Serve the Static React App (The entry point)
app.get("*", (req, res) => {
    /**
     * PATH RESOLUTION:
     * We look for index.html inside the 'site' folder created during predeploy.
     */
    const indexPath = path.join(__dirname, 'site', 'index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Critical Deployment Error: index.html not found at", indexPath);
            res.status(404).send("Site files not found. Please check deployment.");
        }
    });
});

app.post("/api/indexnow", async (req, res) => {
    try {
        const response = await axios.post("https://api.indexnow.org/indexnow", req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("IndexNow Proxy Error:", error.message);
        res.status(500).json({ error: "Failed to notify IndexNow" });
    }
});

// 5. Export the Function as 'ssr'
exports.ssr = onRequest(app);