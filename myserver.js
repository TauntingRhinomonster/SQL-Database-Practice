const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'practice',
    password: 'SeQuel!0!_RB25'
})

app.use(express.json());
app.use(express.static(__dirname));

app.post('/', async (req, res) => {
    const incomingName = req.body.userName;
    const incomingPassword = req.body.userPassword;
    const incomingEmail = req.body.userEmail;

    console.log(`
        We recieved a req to log the following information: 
        username: ${incomingName}
        password: ${incomingPassword}
        email: ${incomingEmail}
    `);

    const query = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`;
    const values = [incomingName, incomingPassword, incomingEmail];

    await pool.query(query, values);
    
    res.status(201).send('Information Saved!');
});

app.listen(3000, () => {
    console.log("Server is listening for requests on port 3000...");
});