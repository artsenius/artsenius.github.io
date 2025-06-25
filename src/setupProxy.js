const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://about-me-automation-backend.azurewebsites.net',
            changeOrigin: true,
            secure: true,
            pathRewrite: {
                '^/api': '/api' // remove base path
            },
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            }
        })
    );
};
