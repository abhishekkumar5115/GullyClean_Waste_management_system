if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./config/db');
const userRoutes = require('./routes/user.routes');
const cookieparser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;


// cors configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    credentials: true, // Allow cookies to be sent with requests
}
app.use(cors(corsOptions));
app.use(cookieparser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user', userRoutes);


app.listen(port, () => { console.log(`Server is running on port ${port}`);
});
