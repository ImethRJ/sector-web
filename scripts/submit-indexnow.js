import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const HOST = 'sectorinstitute.lk';
const KEY = '220e5c9d7d924fada2478adfd92a9bf2';
const KEY_LOCATION = 'https://sectorinstitute.lk/220e5c9d7d924fada2478adfd92a9bf2.txt';

// Simple XML parser to extract <loc> tags
function extractUrls(xmlContent) {
    const urls = [];
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = regex.exec(xmlContent)) !== null) {
        if (match[1].includes(HOST)) {
            urls.push(match[1]);
        }
    }
    return urls;
}

function submitToIndexNow(urlList) {
    const data = JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urlList
    });

    const options = {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/IndexNow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`Status Code: ${res.statusCode}`);
        let responseBody = '';

        res.on('data', (chunk) => {
            responseBody += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200 || res.statusCode === 202) {
                console.log('Success: URLs submitted to IndexNow.');
            } else {
                console.error('Error submitting URLs:', responseBody);
                console.error('Response Code:', res.statusCode);
                // 403: Key not valid
                // 422: URLs don't belong to host or key mismatch
            }
        });
    });

    req.on('error', (error) => {
        console.error('Request Error:', error);
    });

    req.write(data);
    req.end();
}

try {
    if (fs.existsSync(SITEMAP_PATH)) {
        const xmlContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
        const urls = extractUrls(xmlContent);
        if (urls.length > 0) {
            console.log(`Found ${urls.length} URLs to submit:`);
            urls.forEach(u => console.log(` - ${u}`));
            submitToIndexNow(urls);
        } else {
            console.log('No matching URLs found in sitemap.');
        }
    } else {
        console.error(`Sitemap not found at ${SITEMAP_PATH}`);
    }
} catch (err) {
    console.error('Error reading sitemap:', err);
}
