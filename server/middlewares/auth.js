const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        res.status(401).send('Access denied.No token provided.');
    try {
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decode;
        next();
    } catch (exception) {
        res.status(400).send('Invalid token.');
    }
};
