import React, { useState, useEffect} from 'react';
import './Editor.css'; 
import {socket} from '../../services/webSocket';
import { useParams } from 'react-router-dom';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const Editor = ({ code: codeObject }) => {

  const [code, setCode] = useState(codeObject.code.code);
  const [codeFromServer, setCodeFromServer] = useState(codeObject.code.code);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lastSentCode, setLastSentCode] = useState(null);
  const [isFromServer, setIsFromServer] = useState(false);
  const [role, setRole] = useState('mentor');
  const { id } = useParams();
  const correctCode = codeObject.corectCode;

  // Update the code and codeFromServer state variables when codeObject changes
  useEffect(() => {
    setCode(codeObject.code);
    setCodeFromServer(codeObject.code);
  }, [codeObject]);

  // Add an event listener for messages from the server when the component mounts
  useEffect(() => {
    // Listen for updates from server
    socket.addEventListener('message', handleMessage);
    // Clean up event listener
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send updated code to the server and check if the code is correct when the code or isFromServer state variables change
  useEffect(() => {
    // Only send updated code to server if it didn't come from the server
    if (!isFromServer && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ type: 'code', code: code , id: id});
      socket.send(message);
      setLastSentCode(code);
    }
   
    if (code && correctCode && ('`'+code+'`').trim() === correctCode.trim()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
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
        if (message.type === 'code' && message.id === id && message.code !== lastSentCode) {
          if (role === 'mentor') {
            setIsFromServer(true); 
            setCode(message.code);
          }
        }
        if (message.type === 'role') {
          setRole(message.role);
        }
      };
      reader.readAsText(event.data);
    } else {
        const message = JSON.parse(event.data);
        if (message.type === 'code' && message.id === id && message.code !== lastSentCode) {
          if (role === 'mentor') {
            setIsFromServer(true); 
            setCode(message.code);
          }
        }
        if (message.type === 'role') {
          setRole(message.role);
        }
    }
  };
// Handle changes to the editor's content
  const handleInputChange = (editor, data, value) => {
    if (role !== 'mentor') {
      setCode(value)
    }
  };
// Get the value to display in the editor depending on Role
  const getValue = () => {
    if(role === 'mentor'){
      return typeof code === 'string' ? code.replace(/`/g, '') : ''
    }
    else{
      return typeof codeFromServer === 'string' ? codeFromServer.replace(/`/g, '') : ''
    }

  } 
  return (
    <>
    <div className="role">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
    <ReactCodeMirror
      value={getValue()}
      options={{
        mode: 'javascript', 
        theme: 'material', 
        lineNumbers: true,
        readOnly: role === 'mentor', 
      }}
      onChange={handleInputChange}
      
    />
    {isCorrect && role ==='student' && <div className="correct">😊</div>}
    </>
  );
};

export default Editor;