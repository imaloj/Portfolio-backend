import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express'; 
import cors from 'cors';
import apiRouter from '../routes/api';
 // Import API routes
// Load environment variables from .env file

const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 5000
const app = express(); // Create an Express application

app.use(cors({
    origin:`https://portfolio-backend-nxaq.vercel.app/`,
    methods:["GET", "POST"],
    credentials:true,
})); // Enable CORS for all routes

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies 


app.use('/api', apiRouter); // Use the API routes under the '/api' prefix

app.get('/', (_req, res) => {
    res.send('Portfolio Backend API is running'); // Send a simple response for the root route
    });
    

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log the server start message
    })

