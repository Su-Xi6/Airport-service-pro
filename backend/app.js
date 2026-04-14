const express = require('express');
const app = express();

// 注意路径是 ../middleware/ 而不是 ./middleware/
const unifyResponse = require('../middleware/unifyResponse');
const { ipWhitelistMiddleware } = require('../middleware/ipWhitelist');
const bypassForCriticalMiddleware = require('../middleware/bypassForCritical');

// 使用中间件
app.use(unifyResponse);
app.use(ipWhitelistMiddleware);
app.use(bypassForCriticalMiddleware);

// 测试路由
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        isWhitelisted: req.isWhitelisted,
        isCritical: req.criticalBypass
    });
});

app.post('/api/emergency-help', (req, res) => {
    res.json({ 
        success: true, 
        bypassActive: req.criticalBypass 
    });
});

app.get('/api/rate-limit-test', (req, res) => {
    res.json({ message: 'Rate limit test endpoint' });
});

app.listen(3000, () => {
    console.log('✓ Server running on http://localhost:3000');
});