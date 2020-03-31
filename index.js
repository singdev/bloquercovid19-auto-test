const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const autoTestRouter = require('./autotest/autotest-router');

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => console.log(err));

const PORT = 19190;

const app = express();

app.use(bodyParser.json());

app.use('/', autoTestRouter);

app.listen(PORT, () => {
    console.log("Bloquercovid19 auto test service start at port " + PORT);
})