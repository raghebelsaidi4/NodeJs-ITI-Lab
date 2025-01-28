const fs = require('fs');

const filePath = './products.json';

// Read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const productsDB = JSON.parse(data);
        console.log('Products:', productsDB);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
    console.log('Reading the file finished');
});
