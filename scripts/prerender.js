import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4173;
const ROUTES = ['/', '/all-tutors'];

async function startServer() {
    return new Promise((resolve, reject) => {
        const server = spawn('npm', ['run', 'preview', '--', '--port', PORT.toString()], {
            cwd: path.resolve(__dirname, '..'),
            stdio: 'pipe',
            shell: true
        });

        server.stdout.on('data', (data) => {
            if (data.toString().includes('Local:')) {
                resolve(server);
            }
        });

        // Fallback if preview server starts instantly but doesn't output immediately
        setTimeout(() => resolve(server), 3000);
    });
}

async function prerender() {
    console.log('Starting preview server...');
    const server = await startServer();

    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    page.on('response', response => {
        if (response.status() === 404) {
            console.log(`404 NOT FOUND: ${response.url()}`);
        }
    });

    const distDir = path.resolve(__dirname, '../dist');

    for (const route of ROUTES) {
        const url = `http://127.0.0.1:${PORT}${route}`;
        console.log(`Prerendering ${route}...`);

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Wait for the React app to attach to the root element.
        await page.waitForSelector('#root > *', { state: 'attached', timeout: 10000 }).catch(() => {
            console.log(`Timeout waiting for content on ${route}, saving anyway.`);
        });
        // Wait an extra second to ensure dynamic content/images have loaded
        await page.waitForTimeout(1000);

        const html = await page.content();

        const filePath = route === '/'
            ? path.join(distDir, 'index.html')
            : path.join(distDir, route.substring(1), 'index.html');

        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(filePath, html);
        console.log(`Saved ${filePath}`);
    }

    await browser.close();

    // Kill the server specifically for Windows
    if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', server.pid, '/f', '/t']);
    } else {
        server.kill();
    }

    console.log('Prerendering complete!');
    process.exit(0);
}

prerender().catch(err => {
    console.error(err);
    process.exit(1);
});
