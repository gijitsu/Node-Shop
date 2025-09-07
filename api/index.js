const express = require("express");  
const dotenv = require("dotenv");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const databaseSeeder = require('./databaseSeeder');
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

dotenv.config();
app.use(express.json());


// cors config

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

// root url 
app.get("/", (req, res) => {
    res.send('Hello World');
});

// setup connection to Mongo DB.
mongoose.connect(`${DB_URL}`).then(() => {
    console.log("db connected")}).then((err) => {
        err;
});

// database seeder
app.use('/api/seed', databaseSeeder);

// routes for users
app.use('/api/users', userRoute);

// routes for products
app.use('/api/products', productRoute);

// routes for order
app.use('/api/orders', orderRoute);


app.listen(PORT || 9000, () => {
    console.log(`Server is running at https://localhost:${PORT}`)
});


