require('dotenv').config();
const express = require('express');
const app = express();
const bp = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const router = express.Router();
const port = process.env.PORT || 8000;

app.set('tokenSecret', process.env.TOKENSECRET);
app.use(express.static(path.join(__dirname, 'client')));
app.use('/js', express.static(path.join(__dirname, 'bower_components')));
app.use('/app', express.static(path.join(__dirname, 'application')));

app.use(bp.json());
app.use(bp.urlencoded({'extended' : true}));

require("./server/routes/routes")(router);
app.use('/', router);

require("./server/config/mongoose");

console.log("Server is running");

app.listen(port);
