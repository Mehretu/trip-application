"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan = require("morgan");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(morgan('combined'));
app.use(express_1.default.json());
//Rate Limiter Configuration
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 100,
    max: 100,
    message: "Too Many request from this IP, Please try again later."
});
app.use(limiter);
app.use('/users', auth_1.authenticateJWT, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `http://user-service:${process.env.USER_SERVICE_PORT}`,
    changeOrigin: true
}));
app.use('/trips', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `http://trip-service:${process.env.TRIP_SERVICE_PORT}`,
    changeOrigin: true
}));
app.use('/demand', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `http://demand-service:${process.env.DEMAND_SERVICE_PORT}`,
    changeOrigin: true
}));
app.use('/supply', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `http://supply-service:${process.env.SUPPLY_SERVICE_PORT}`,
    changeOrigin: true
}));
app.use('/location', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `http://location-service:${process.env.LOCATION_SERVICE_PORT}`,
    changeOrigin: true
}));
app.use('/notifications', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `http://notification-service:${process.env.NOTIFICATION_SERVICE_PORT}`,
    changeOrigin: true
}));
app.use('/pricing', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `http://pricing-service:${process.env.PRICING_SERVICE_PORT}`,
    changeOrigin: true
}));
app.use('/analytics', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `http://analytics-service:${process.env.ANALYTICS_SERVICE_PORT}`,
    changeOrigin: true
}));
//error handling middleware9
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
