const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

const employeeRouter = require('./router/employeeRouter.js')
const app = express();
app.use(bodyparser.json());

const url = "mongodb://localhost:27017"
mongoose.connect(url)
    .then(() => {
        console.log("connected")
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/empl', employeeRouter);

app.listen(5600)




