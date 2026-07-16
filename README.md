# SQL-Database-Practice

A simple full-stack practice project for CSE 310. It uses a PostgreSQL database, an Express.js backend, and a basic HTML form frontend to insert user records into a database.

This project focuses on learning core database and server concepts: table design, foreign keys, SQL queries, REST-style routes, and connecting a Node.js server to PostgreSQL.

## Project Structure

| File / Folder | Purpose |
|---|---|
| `database.sql` | Creates and resets the `users` and `friends` tables |
| `myserver.js` | Express server, PostgreSQL connection, and API routes |
| `index.html` | Frontend form page |
| `client.js` | Browser-side JavaScript that sends form data to the server |
| `styles.css` | Page styling |
| `src/images/` | Static assets used by the frontend |

## Database Schema

**`users`**
- `id` (SERIAL, primary key)
- `username`, `password`, `email` (required)
- `favorite_color`, `age` (optional)

**`friends`**
- Many-to-many relationship between users
- Composite primary key on `(user_id, friend_id)`
- Foreign keys reference `users(id)`
- `CHECK (user_id < friend_id)` prevents duplicate reversed friendships

## Instructions for Build and Use

### Steps to build and/or run the software

1. Install [PostgreSQL](https://www.postgresql.org/download/) and make sure the server is running.
2. Install [Node.js](https://nodejs.org/) (LTS recommended).
3. Clone or download this repository.
4. Open a terminal in the project folder and install dependencies:
   ```powershell
   npm install
   ```
5. Create the database in PostgreSQL (if it does not already exist):
   ```sql
   CREATE DATABASE practice;
   ```
6. Run the schema file to create the tables:
   ```powershell
   psql -U postgres -d practice -f database.sql
   ```
   If `psql` is not in your PATH, use the full path to `psql.exe` from your PostgreSQL installation.
7. Update the database connection settings in `myserver.js` to match your local PostgreSQL username, password, and database name.
8. Start the server:
   ```powershell
   node myserver.js
   ```
9. Open the app in your browser:
   ```text
   http://localhost:3001/
   ```

### Instructions for using the software

1. Open `http://localhost:3001/` in your browser.
2. Enter a username, password, and email in the form.
3. Click **Submit Data** to send the information to the server.
4. The server inserts the record into the `users` table in PostgreSQL.
5. To verify saved data, query the database in `psql`:
   ```sql
   SELECT * FROM users;
   ```

## Development Environment

To recreate the development environment, you need the following software and/or libraries:

* **PostgreSQL** — local database server
* **Node.js** — JavaScript runtime
* **npm** — package manager (included with Node.js)
* **express** `^5.2.1` — web server framework
* **pg** `^8.22.0` — PostgreSQL client for Node.js
* **dotenv** `^17.4.2` — environment variable support

The server runs on **port 3001** by default to avoid conflicts with other local projects.

## Useful Websites to Learn More

I found these websites useful in developing this software:

* [Express.js Docs](https://expressjs.com/en/5x/starter/basic-routing/)
* [W3Schools: Express.js](https://www.w3schools.com/nodejs/nodejs_express.asp)
* [Darwin Tech: Build a Basic Express JS Server (YouTube)](https://www.youtube.com/watch?v=7W61Ep1lKFY)

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ] Allow users to submit favorite color and age.
* [ ] Allow the user to view all users favorite colors in a chart that gives percentages.
* [ ] Add the ability to encrypt user information.
