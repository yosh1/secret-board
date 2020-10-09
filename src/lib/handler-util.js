'use strict';

function handleLogout(req, res) {
    res.writeHead(401, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end('Logouted');
}

function handleNotFound(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end('Not found');
}

function handleBadRequest(req, res) {
    res.writeHead(400, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end('Bad Request');
}

module.exports = {
    handleLogout,
    handleNotFound,
    handleBadRequest
};
