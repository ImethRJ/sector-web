import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteFolderRecursive = function (directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
};

const copyFolderRecursiveSync = function (source, target) {
    if (!fs.existsSync(target)) fs.mkdirSync(target);

    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);
        files.forEach((file) => {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(target, file));
            } else {
                copyFolderRecursiveSync(curSource, target);
            }
        });
    } else {
        const targetFile = path.join(target, path.basename(source));
        fs.copyFileSync(source, targetFile);
    }
};

const distDir = path.join(__dirname, '..', 'dist');
const targetDir = path.join(__dirname, '..', 'functions', 'site');

console.log(`Cleaning ${targetDir}...`);
deleteFolderRecursive(targetDir);

console.log(`Copying from ${distDir} to ${targetDir}...`);
copyFolderRecursiveSync(distDir, targetDir);

console.log('Done.');
