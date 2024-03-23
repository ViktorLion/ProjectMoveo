import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from './Editor';
import './CodeBlock.css';
import { useNavigate } from 'react-router-dom';
import {socket}  from '../../services/webSocket';


const CodeBlock = ({ codeBlocks}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const { id } = useParams();
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [editedCode, setEditedCode] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    if (codeBlocks.length > 0) {
      const block = codeBlocks.find((b) => b.title === id);

      setSelectedBlock(block);
      setEditedCode(block.code);
    }
  }, [codeBlocks, id]);


  const handleCodeChange = (newCode) => {
    setEditedCode(newCode);
    compareCode();
  };

  if (!selectedBlock) {
    return <div>Loading...</div>;
  }

  const { title } = selectedBlock;

  const compareCode = () => {
    const correct = editedCode.trim() === selectedBlock.corectCode.trim();
    setIsCorrect(correct);
    if (correct) {
      setTimeout(() => setIsCorrect(false), 3000);
      console.log('Correct!');
    } else {
      console.log('Incorrect!');
    }
  };
  const goBack = () => {
    if (socket) {
      socket.close();
    }
    navigate(-1);
  };

  return (
    <div className="codeblock">
    <h2>{title}</h2>
    <Editor code={editedCode} onChange={handleCodeChange}/>
    <button onClick={goBack}>Back</button>

    {isCorrect && <div className="correct">😊</div>}
  </div>
  );
};

export default CodeBlock;