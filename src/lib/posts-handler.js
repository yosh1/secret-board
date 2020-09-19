'use strict';

const pug = require('pug');

function handle(req, res) {
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(pug.renderFile('./src/views/posts.pug'));
            break;
        case 'POST':
            let body = [];
            // data / endを受け取ったとき
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                // buffer ... バイナリを扱う。脆弱性があるのであとでリプレイス
                // concat ... 配列の結合
                const decoded = decodeURIComponent(body);
                const content = decoded.split('content=')[1]; // key=valueのため
                console.info('Posted: ' + content);
                handleRedirectPosts(req, res);
            })
            break;
        default:
            break;
    }
}

function handleRedirectPosts(req, res) {
    // 303 - See Other
    res.writeHead(303, {
        'Location': '/posts'
    });
    res.end();
}

module.exports = {
    handle
};
