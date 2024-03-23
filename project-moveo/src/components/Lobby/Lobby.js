import React from 'react';
import { Link } from 'react-router-dom';
import './Lobby.css'; 
import { openSocket, socket } from '../../services/webSocket';



const Lobby = ({ codeBlocks, isLoading }) => {
  
  const onBlockClick = (block) => {
    console.log('Block clicked:', block.id);
    openSocket(block.id);

     // Open the WebSocket connection

    socket.addEventListener('message', (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function() {
          const message = JSON.parse(this.result);
          if (message.type === 'role_response') {
            //console.log('Received role:', message.role);
          }
        };
        reader.readAsText(event.data);
      } else {
        const message = JSON.parse(event.data);
        if (message.type === 'role_response') {
          //console.log('Received role:', message.role);
        }
      }
    });
  };

  return (
    <div className="lobby">
      <h2>Choose code block</h2>
      {isLoading ? (
        <p>Loading code blocks...</p>
      ) : (
        <ul>
          {codeBlocks?.length === 0 ? ( // Check if array is empty or undefined
            <p>No code blocks found.</p>
          ) : (
            codeBlocks.map((block) => (
              <li key={block.title}>
                <Link to={`/codeblock/${block.title}`}  onClick={() => onBlockClick(block) } >{block.title}</Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Lobby;