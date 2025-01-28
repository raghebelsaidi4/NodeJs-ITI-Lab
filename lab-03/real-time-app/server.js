const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let itemsCount = 10; // Initial ItemsCount

// Serve static HTML files
app.use(express.static("public"));

// Route: Buy Page
app.get("/buy", (req, res) => {
    res.sendFile(__dirname + "/public/buy.html");
});

// Route: Show Remaining Items Page
app.get("/showRemainingItems", (req, res) => {
    res.sendFile(__dirname + "/public/showRemainingItems.html");
});

// Socket.IO connection
io.on("connection", (socket) => {
    console.log("A client connected");

    // Send initial items count to the client
    socket.emit("CountChanged", itemsCount);

    // Disconnect event
    socket.on("disconnect", () => {
        console.log("A client disconnected");
    });
});

// Buy function
app.post("/buy", (req, res) => {
    if (itemsCount > 0) {
        itemsCount--; // Decrease count by 1
        io.emit("CountChanged", itemsCount); // Notify all connected clients
        res.status(200).send("Item purchased successfully.");
    } else {
        res.status(400).send("No items left to buy.");
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
