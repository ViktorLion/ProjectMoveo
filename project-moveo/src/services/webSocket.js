let socket = null;


const openSocket = (id) => {
  socket = new WebSocket('ws://moveo-backend.vercel.app:8080');
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'id', id }));
  };
};

export { socket, openSocket };