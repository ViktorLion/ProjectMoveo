import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../Editor/Editor';
import './CodeBlock.css';
import { useNavigate } from 'react-router-dom';
import {socket}  from '../../services/webSocket';


const CodeBlock = ({ codeBlocks}) => {
  const { id } = useParams();
  const [selectedBlock, setSelectedBlock] = useState(null);
  const navigate = useNavigate();

  // Update the selectedBlock state variable when codeBlocks or id changes
  useEffect(() => {
    if (codeBlocks.length > 0) {
      const block = codeBlocks.find((b) => b.title === id);
      setSelectedBlock(block);
    }
  }, [codeBlocks, id]);

  // Show a loading message if selectedBlock is not defined
  if (!selectedBlock) {
    return <div>Loading...</div>;
  }
  const { title } = selectedBlock;

  // Function to go back to the previous page
  const goBack = () => {
    if (socket) {
      socket.close();
    }
    navigate(-1);
  };

  return (
    <div className="codeblock">
    <h2>{title}</h2>
    <Editor code={selectedBlock}/>
    <button className="button" onClick={goBack}>Back</button>
  </div>
  );
};

export default CodeBlock;