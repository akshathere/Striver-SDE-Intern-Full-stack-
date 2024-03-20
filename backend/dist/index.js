"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
require('dotenv').config();
app.use(body_parser_1.default.json());
app.use(cors());
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.pass,
    database: 'Coding'
});
console.log(process.env.PASS);
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});
app.get('/', (req, res) => {
    res.send(`
      <form action="/submit" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
  
        <label for="codeLanguage">Preferred Code Language:</label>
        <select id="codeLanguage" name="codeLanguage" required>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
        </select><br><br>
  
        <label for="stdin">Standard Input (stdin):</label>
        <textarea id="stdin" name="stdin" rows="4" cols="50" required></textarea><br><br>
  
        <label for="sourceCode">Source Code:</label><br>
        <textarea id="sourceCode" name="sourceCode" rows="10" cols="50" required></textarea><br><br>
  
        <input type="submit" value="Submit">
      </form>
    `);
});
// Route for submitting form data (Page 1)
app.post('/submit', (req, res) => {
    const { username, codeLanguage, stdin, sourceCode } = req.body;
    const timestamp = new Date();
    const entry = { username, codeLanguage, stdin, sourceCode, timestamp };
    // Insert entry into MySQL database
    connection.query('INSERT INTO entries SET ?', entry, (err) => {
        if (err) {
            console.error('Error inserting entry into database: ', err);
            res.sendStatus(500);
            return;
        }
        console.log('Entry inserted into database');
        res.redirect('/entries');
    });
});
// Route for displaying submitted entries (Page 2)
app.get('/entries', (req, res) => {
    // Fetch entries from MySQL database
    connection.query('SELECT * FROM entries', (err, results) => {
        if (err) {
            console.error('Error fetching entries from database: ', err);
            res.sendStatus(500);
            return;
        }
        console.log(results);
        const formattedEntries = results.map(entry => ({
            username: entry.username,
            codeLanguage: entry.codeLanguage,
            stdin: entry.stdin,
            timestamp: entry.timestamp,
            sourceCode: entry.sourceCode.substring(0, 100)
        }));
        // Send the formatted entries as JSON
        res.json(formattedEntries);
    });
});
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
