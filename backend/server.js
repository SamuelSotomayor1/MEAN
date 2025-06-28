const authRoutes = require("./auth/auth.routes");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use('/api', router);

router.get('/', (req,res) => {
    res.send('Hello');
})

app.use(router);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});