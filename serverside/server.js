import express from 'express';
import routes from './src/routes/routes.js';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors())

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
//jwt middleware
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// routes 
routes(app);

app.get('/', (req, res) => {
    res.send("Welcome to Kenya-data-viz API!");
});


app.listen(process.env.DB_PORT || 5000, () => {
    console.log('Server is running');
});