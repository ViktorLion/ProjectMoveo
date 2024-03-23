let socket = null;

const openSocket = (id) => {
  socket = new WebSocket('ws://localhost:8080');
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'id', id }));
  };
//   // Listen for messages
//   socket.addEventListener('message', (event) => {
//     console.log('Message from server: ', event.data);
//   });

//   // Connection closed
//   socket.addEventListener('close', (event) => {
//     console.log('Server closed connection: ', event);
//   });

//   // Connection error
//   socket.addEventListener('error', (event) => {
//     console.log('WebSocket error: ', event);
//   });
};

export { socket, openSocket };