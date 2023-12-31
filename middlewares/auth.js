const jwt = require('jsonwebtoken');
const config = require('../config');
// validate my request
// middleware
function basicAuth(req, res, next) {
    const headers = req.headers;
    const authHeader = headers.authorization;
    if (!authHeader) {
        res.status(401).send('Unauthorized');
    } else {
        // basic ..alslsls=
        const tokens = authHeader.split(' ');
        const base64Str = tokens[1];
        const buf = Buffer.from(base64Str, 'base64');
        const decodedStr = buf.toString();
        // username:password
        const credentials = decodedStr.split(':');
        const username = credentials[0];
        const password = credentials[1];

        if (username === 'admin' && password === 'password')
            next();
        else res.status(401).send('unauthorized');
    }
}

function tokenAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).send('Unauthorized');
        } else {
            // Bearer dkfjdkfjdkfjdk===
            const tokens = authHeader.split(' ');
            const jwtToken = tokens[1];

            const decoded = jwt.verify(jwtToken, config.jwtSecret);
            req.token = decoded;
            next();
        }
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

function authorizeAdmin(req, res, next) {
    const role = req.token.role;
    if (role.toLowerCase() === 'admin') next();
    else res.status(403).send('Forbidden');
};

module.exports = {
    basicAuth,
    tokenAuth,
    authorizeAdmin,
};
