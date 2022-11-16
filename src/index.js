import express from 'express'
import cors from 'cors';
import AuthRouter from './routers/auth-router.js';
import dotenv from 'dotenv';

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());
server.use(AuthRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})