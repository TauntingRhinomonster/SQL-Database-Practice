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

// make a get request here...
app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT username FROM users ORDER BY id');
    const usernames = result.rows.map((row) => row.username);
    res.json(usernames);
});

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

app.delete('/users/last', async (req, res) => {
    const lastUserResult = await pool.query(
        'SELECT id, username FROM users ORDER BY id DESC LIMIT 1'
    );

    if (lastUserResult.rows.length === 0) {
        return res.status(404).send('No users to delete');
    }

    const lastUserId = lastUserResult.rows[0].id;
    const lastUsername = lastUserResult.rows[0].username;

    await pool.query(
        'DELETE FROM friends WHERE user_id = $1 OR friend_id = $1',
        [lastUserId]
    );
    await pool.query('DELETE FROM users WHERE id = $1', [lastUserId]);

    console.log(`Deleted last user: ${lastUsername} (id: ${lastUserId})`);
    res.send(`Deleted user: ${lastUsername}`);
});

app.listen(3001, () => {
    console.log("Server is listening for requests on port 3001...");
});