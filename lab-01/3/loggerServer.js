const http = require('http');
const fs = require('fs');

// Path for the log file
const logFilePath = './request.log';

// Function to log request details
const logRequest = (req) => {
    const logData = `Date: ${new Date().toISOString()}, Method: ${req.method}, URL: ${req.url}\n`;
    fs.appendFile(logFilePath, logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
};

// Array of sample products
const products = [
    { name: 'p1', color: 'red', price: 100 },
    { name: 'p2', color: 'blue', price: 200 },
    { name: 'p3', color: 'black', price: 300 },
];

// Create the HTTP server
const server = http.createServer((req, res) => {
    logRequest(req); // Log the incoming request

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Content-Type': 'application/json',
    };

    if (req.url === '/products' && req.method === 'GET') {
        // Return the list of products
        res.writeHead(200, headers);
        res.end(JSON.stringify(products));
    } else if (req.url.startsWith('/products/') && req.method === 'GET') {
        // Extract product ID from URL
        const id = parseInt(req.url.split('/')[2]);
        if (!isNaN(id) && id > 0 && id <= products.length) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(products[id - 1])); // Return product by ID
        } else {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ error: 'Product not found' }));
        }
    } else if (req.url === '/home' && req.method === 'GET') {
        // Welcome route
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to our APIs</h1>');
    } else if (req.url === '/' && req.method === 'GET') {
        // Redirect to /home
        res.writeHead(302, { Location: '/home' });
        res.end();
    } else {
        // Handle invalid routes
        res.writeHead(404, headers);
        res.end(JSON.stringify({ error: 'Invalid endpoint' }));
    }
});

// Start the server on port 5000
server.listen(6000, () => {
    console.log('Server is running on http://localhost:5000');
});
