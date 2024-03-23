let socket = null;

const openSocket = (id) => {
  socket = new WebSocket('ws://localhost:8080');
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'id', id }));
  };
};

export { socket, openSocket };