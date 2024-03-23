import React, { useState, useEffect} from 'react';
import './Editor.css'; 
import {socket} from '../../services/webSocket';
import { useParams } from 'react-router-dom';


const Editor = ({ code: initialCode  , onChange  } ) => {
  const [code, setCode] = useState(initialCode);
  const [isFromServer, setIsFromServer] = useState(false);
  const [role, setRole] = useState('mentor');
  const { id } = useParams();


  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    // Only send updated code to server if it didn't come from the server
    if (!isFromServer && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ type: 'code', code: code , id: id});
      socket.send(message);
    }
  
    setIsFromServer(false); // Reset the flag after sending
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, isFromServer]);

  // Define event handler function
  const handleMessage = (event) => {
    // Check if the data is a Blob
    if (event.data instanceof Blob) {
      // Convert the Blob to a string
      const reader = new FileReader();
      reader.onload = function() {
        const message = JSON.parse(this.result);
        if (message.type === 'code' && message.id === id) {
          setIsFromServer(true); 

          setCode(message.code);
        }

      };
      reader.readAsText(event.data);
    } else {
        const message = JSON.parse(event.data);
        if (message.type === 'code') {
          setIsFromServer(true); 
          setCode(message.code);
        }
        if (message.type === 'role') {
          setRole(message.role);

        }
    }
  };

  useEffect(() => {
    // Listen for updates from server
    socket.addEventListener('message', handleMessage);
    // Clean up event listener
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleInputChange = (event) => {
    if (role !== 'mentor') { // Add this line
      setCode(event.target.value);
      if (onChange) {
        onChange(event.target.value);
      }
    }
  };

  return (
    <textarea
      className="editor"
      value={code}
      onChange={handleInputChange}
      readOnly={role === 'mentor'}
    />
  );
};

export default Editor;