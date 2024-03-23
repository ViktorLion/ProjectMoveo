const express = require('express');
const next = require('next');
const { wss } = require('../my-backend/utils/websocket'); // Import wss from websocket.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express(); // Create Express server

const cors = require('cors');
server.use(cors())

// Create Express server
const startServer = async () => {
    
  try {
    await app.prepare();
    server.all('*', (req, res) => {
      return handle(req, res);
    });
    const PORT = process.env.PORT || 3000; // Set your desired port here
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit on error
  }
};


startServer();