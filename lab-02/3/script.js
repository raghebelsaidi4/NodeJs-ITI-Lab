// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware: Parse incoming request body as JSON or URL-encoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Array of product names
const products = ["Laptop", "Phone", "Tablet", "Smartwatch", "Monitor", "Keyboard", "Mouse", "Speaker", "Headphones", "Camera"];

// Serve static HTML files for the forms
app.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to the Service</h1>
    <p><a href="/welcome-form">Go to Welcome Form</a></p>
    <p><a href="/login-form">Go to Login Form</a></p>
  `);
});

// --- GET: /welcome ---
app.get('/welcome', (req, res) => {
    const username = req.query.username;
    if (username) {
        res.send(`Welcome, ${username}!`);
    } else {
        res.send("Please provide a username.");
    }
});

// HTML form for GET method
app.get('/welcome-form', (req, res) => {
    res.send(`
    <form action="/welcome" method="get">
      <label for="username">Enter your name:</label>
      <input type="text" id="username" name="username" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

// --- POST: /login ---
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (username && password) {
        res.send(`Welcome, ${username}!`);
    } else {
        res.send("Username and password are required.");
    }
});

// HTML form for POST method
app.get('/login-form', (req, res) => {
    res.send(`
    <form action="/login" method="post">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  `);
});

// --- GET: /products:id ---
app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    // Validate that ID is a two-digit number
    if (!/^\d{2}$/.test(id)) {
        return res.status(400).send("ID must be a two-digit number.");
    }

    const index = parseInt(id, 10);
    const product = products[index];

    if (product) {
        res.send(`Product at index ${id}: ${product}`);
    } else {
        res.status(404).send("Product not found.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
