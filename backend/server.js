require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001; // Use environment variable or default

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Patse JSON bodies
app.use(express.urlencoded({extended: true})) // Parse URL-encoded bodies

// Basic routes for testing
app.get('/', (req, res) => {
    res.send('Cinpehyle backend is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});