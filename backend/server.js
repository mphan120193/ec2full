
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { logger} from "./middlewares/logEvents.js";
import {errorHandler, notFound} from './middlewares/errorHandler.js';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import doctorRoutes from  './routes/doctorRoutes.js';
import verifyJWT from './middlewares/verifyJWT.js';
import { ROLES_LIST } from './config/roles_list.js';
import { verifyRoles } from './middlewares/verifyRoles.js';
let port = process.env.PORT || 6969;

connectDB();
const app = express();
// custom  middleware logger
app.use(logger);

// Cross Origin Resource Sharing
// Only allow the url in the whitelist to access the backend.
// Remove the 'http://127.0.0.1:5500', 'http://localhost:8080' and || !origin on Production

const whitelist = ['https://www.yoursite.com',
'http://localhost',
'http://localhost:80',
'http://127.0.0.1',
'http://127.0.0.1:80',];
const corsOptions={
    origin: (origin, callback)=>{
        if(whitelist.lastIndexOf(origin) !==-1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());



app.use('/api/auth', authRoutes);
app.use('/api/doctor',verifyJWT, doctorRoutes);



// Protected with JWT and Role  example
// app.use('/api/protected', verifyJWT, verifyRoles(ROLES_LIST.Amdin), (req, res) => {
//   res.json({ message: `Hello user ${req.userId}, this is protected.` });
// });


app.use('/api/protected', verifyJWT, (req, res) => {
    res.json({ message: `Hello user ${req.userId}, this is protected.` });
  });




app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log('Server is runinng on port' , port));






