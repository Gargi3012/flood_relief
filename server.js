const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8085;
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let rawPath = req.url.split('?')[0].split('#')[0];
    if (rawPath === '/') rawPath = '/index.html';
    let filePath = path.join(__dirname, decodeURIComponent(rawPath));

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Accept-Ranges', 'bytes');

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const safeEnd = Math.min(end, fileSize - 1);
        const chunksize = (safeEnd - start) + 1;
        
        const file = fs.createReadStream(filePath, { start, end: safeEnd });
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${safeEnd}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': contentType,
        });
        file.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': contentType,
        });
        fs.createReadStream(filePath).pipe(res);
    }
});

server.listen(PORT, () => {
    console.log(`Video Streaming Server running on http://localhost:${PORT}`);
});
