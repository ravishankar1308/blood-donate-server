const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

// var corsOptions = {
//     origin: "http://localhost:8085"
// };
//
// app.use(cors(corsOptions));

app.use(logger('dev'));

app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async function () {
        await console.log("Successfully connect to MongoDB.");
        await initialRoles();

    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

mongoose.set('useCreateIndex', true);


// simple route
app.get("/", async (req, res) => {
    res.json({message: "Welcome to test application"});
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/book.routes")(app);
require("./app/routes/borrow.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const Role =require('./app/models/role.model');
const User =require('./app/models/user.model');
async function initialRoles() {
    await Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "driver"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'driver' to roles collection");
            });

            new Role ({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });

}






