const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions");
const express = require("express");
const path = require("path");

// Configuration: Max 10 instances
setGlobalOptions({ maxInstances: 10 });

const app = express();

// 1. Updated Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; font-src 'self' https://sector-institute.web.app data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:;"
    );
    next();
});

// 2. Serve Static Assets (CSS, JS, Images)
/** * This is critical. Since you moved 'dist' inside 'functions', 
 * you must tell Express to serve the static files from this new path.
 */
app.use(express.static(path.join(__dirname, 'dist')));

// 3. Prerender.io Middleware
app.use(require('prerender-node')
    .set('prerenderToken', 'xV3xxGRXT1nbc3fTwloG') 
);

// 4. Serve the Static React App (The entry point)
app.get("*", (req, res) => {
    /**
     * CORRECTED PATH: 
     * Now that 'dist' is INSIDE your functions folder, 
     * we remove the '../' and point to './dist/index.html'.
     */
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Critical Deployment Error: index.html not found at", indexPath);
            res.status(404).send("Site files not found. Please check deployment.");
        }
    });
});

// 5. Export the Function as 'ssr'
exports.ssr = onRequest(app);