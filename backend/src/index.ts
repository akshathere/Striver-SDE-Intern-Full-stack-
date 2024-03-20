import bodyParser from "body-parser"
import express from "express"
import mysql from 'mysql'
import { Request, Response } from 'express-serve-static-core';
require('dotenv').config();

const cors = require('cors')
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.pass,
    database: 'Coding'
  });
  console.log(process.env.PASS)
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
interface Entry {
    username: string;
    codeLanguage: string;
    stdin: string;
    sourceCode: string;
    timestamp: Date;
  }
  app.get('/', (req: Request, res: Response) => {
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
  app.post('/submit', (req: Request, res: Response) => {
    const { username, codeLanguage, stdin, sourceCode } = req.body;
    const timestamp = new Date();
    const entry: Entry = { username, codeLanguage, stdin, sourceCode, timestamp };
  
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
  app.get('/entries', (req: Request, res: Response) => {
    // Fetch entries from MySQL database
    connection.query('SELECT * FROM entries', (err:mysql.MysqlError , results: Entry[]) => {
      if (err) {
        console.error('Error fetching entries from database: ', err);
        res.sendStatus(500);
        return;
      }
      console.log(results)
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