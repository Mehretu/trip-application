import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan = require('morgan');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


//Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

