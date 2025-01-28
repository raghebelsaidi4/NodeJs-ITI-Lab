const http = require('http');
const fs = require('fs');

// Path to the JSON file
const filePath = './products.json';

// Read the JSON file and parse it into productsDB
let productsDB = [];
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        productsDB = JSON.parse(data);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});

// Create the HTTP server
const server = http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Content-Type': 'application/json',
    };

    if (req.url.startsWith('/products/') && req.method === 'GET') {
        const id = parseInt(req.url.split('/')[2]); // Extract the id from the URL
        if (!isNaN(id) && id > 0 && id <= productsDB.length) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(productsDB[id - 1])); // Return product at index (id - 1)
        } else {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ error: 'Product not found' }));
        }
    } else {
        res.writeHead(404, headers);
        res.end(JSON.stringify({ error: 'Invalid endpoint' }));
    }
});

// Start the server on port 4000
server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
