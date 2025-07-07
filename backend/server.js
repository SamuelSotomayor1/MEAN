const authRoutes = require("./auth/auth.routes");
const betRoutes = require("./routes/bet.routes");
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

authRoutes(router)

app.use('/api', router);
app.use("/api/bets", betRoutes); 

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

router.get('/', (req,res) => {
    res.send('Hello');
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});