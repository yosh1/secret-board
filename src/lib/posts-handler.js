'use strict';

const pug = require('pug');
const util = require('./handler-util');
const contents = [];

function handle(req, res) {
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(pug.renderFile('./src/views/posts.pug', { contents: contents }));
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
                contents.push(content);
                console.log(contents);
                handleRedirectPosts(req, res);
            })
            break;
        default:
            util.handleBadRequest(req, res);
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
