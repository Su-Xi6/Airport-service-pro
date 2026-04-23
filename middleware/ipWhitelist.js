const WHITELIST_IPS = [
    '127.0.0.1',
    '::1',
    '192.168.1.1',
    '10.0.0.1'
];

const isWhitelisted = (ip) => {
    return WHITELIST_IPS.includes(ip);
};

const ipWhitelistMiddleware = (req, res, next) => {
    // 只加了这一句，获取真实IP
    const clientIp = 
        req.headers['x-real-ip'] || 
        req.ip || 
        req.connection.remoteAddress;
    
    req.isWhitelisted = isWhitelisted(clientIp);
    next();
};

module.exports = { ipWhitelistMiddleware, isWhitelisted };