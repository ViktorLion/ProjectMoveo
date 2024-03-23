let socket = null;


const openSocket = (id) => {
  socket = new WebSocket('ws://movero-backend-express-production.up.railway.app:8080');
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'id', id }));
  };
};

export { socket, openSocket };