let socket = null;


const openSocket = (id) => {
  
  //change to ws://localhost:5001/ws for local development
  socket = new WebSocket('ws://movero-backend-express-production.up.railway.app:5001/ws');
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'id', id }));
  };
};

export { socket, openSocket }; 