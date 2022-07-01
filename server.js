//packages
require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const chalk = require('chalk');
const cors = require('cors');
const morgan = require('morgan');
//db
const connectDB = require('./config/db');
//routes
const routes = require('./routes/routes');
//cors
app.use(cors({
    origin: '*'
}));
//middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use('/', routes);
//db
connectDB().then(() => {
    console.log(chalk.yellow('Connected to database'));
    app.listen(PORT, () => {
        console.log(chalk.blue(`App is running on port ${PORT}`))
    });
}).catch(err => {
    console.log(chalk.red('Error in starting server'))
})
//port
const PORT = process.env.PORT || 5000;