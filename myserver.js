// let http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'content-type': 'text/html'});
//     res.end('Hello World!');
// }).listen(8000);

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "practice",
    port: "5432",
    password: "SeQuel!0!_RB25"
})

pool.connect()
.then(() => {console.log("connected to pg")})
.catch(() => {
    console.log("Can't connect to pg")
})

module.exports = { Pool }