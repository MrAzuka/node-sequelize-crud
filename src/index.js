const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const { connectToDb } = require('./utils/db')
const apiRoutes = require("./routes/index")


// Initializing the app
const app = express();
const port = process.env.PORT || '5000';

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to TODO API V1"
    });
});

app.use('/api', apiRoutes)

app.listen(port, async (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log(`Server is running on PORT ${port}`);
        await connectToDb();
    }

})
