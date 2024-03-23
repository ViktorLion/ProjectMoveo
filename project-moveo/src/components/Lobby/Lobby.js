import React from 'react';
import { Link } from 'react-router-dom';
import './Lobby.css'; 
import { openSocket, socket } from '../../services/webSocket';



const Lobby = ({ codeBlocks, isLoading }) => {

  // Close the WebSocket connection if Lobby component is exited 
  if (socket) {
    socket.close();
  }
  // Define a function to handle clicking on a block
  const onBlockClick = (block) => {
    openSocket(block.id); 
  };

  return (
    <div className="lobby">
      <h2>Choose code block</h2>
      {isLoading ? (
        <p>Loading code blocks...</p>
      ) : (
        <ul>
          {codeBlocks?.length === 0 ? ( 
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
  )
};

export default Lobby;