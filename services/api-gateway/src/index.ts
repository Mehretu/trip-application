import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan = require('morgan');
import { createProxyMiddleware } from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';
import { authenticateJWT } from './middleware/auth';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


//Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

//Rate Limiter Configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    message: "Too Many request from this IP, Please try again later."
});

app.use(limiter);

app.use(
    '/users',
    authenticateJWT,
    createProxyMiddleware(
        {
            target: `http://user-service:${process.env.USER_SERVICE_PORT}`,
            changeOrigin:true
        }));
app.use(
    '/trips', 
    createProxyMiddleware(
        {
            target: `http://trip-service:${process.env.TRIP_SERVICE_PORT}`, 
            changeOrigin:true
        }));
app.use(
    '/demand',
    createProxyMiddleware(
        {
            target:`http://demand-service:${process.env.DEMAND_SERVICE_PORT}`,
            changeOrigin:true
        }
    )
);
app.use(
    '/supply',
    createProxyMiddleware(
        {
            target:`http://supply-service:${process.env.SUPPLY_SERVICE_PORT}`,
            changeOrigin:true
        }
    )
);
app.use(
    '/location',
    createProxyMiddleware(
        {
            target:`http://location-service:${process.env.LOCATION_SERVICE_PORT}`,
            changeOrigin:true
        }
    )
);
app.use(
    '/notifications',
    createProxyMiddleware(
        {
            target:`http://notification-service:${process.env.NOTIFICATION_SERVICE_PORT}`,
            changeOrigin:true
        }
    )
);
app.use(
    '/pricing',
    createProxyMiddleware(
        {
            target:`http://pricing-service:${process.env.PRICING_SERVICE_PORT}`,
            changeOrigin:true
        }
    )
);
app.use(
    '/analytics',
    createProxyMiddleware(
        {
            target:`http://analytics-service:${process.env.ANALYTICS_SERVICE_PORT}`,
            changeOrigin:true
        }
    )
);

//error handling middleware9
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

app.listen(PORT, ()=> {
    console.log(`API Gateway running on port ${PORT}`);
});

