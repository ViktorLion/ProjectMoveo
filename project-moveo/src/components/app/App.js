import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from '../Lobby/Lobby';
import CodeBlock from '../CodeBlock/CodeBlock';
import './App.css';
import '../../index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    
    // Fetch the code blocks from the backend
    // change to http://localhost:3010/api/code-blocks for local development
    fetch('https://movero-backend-express-production.up.railway.app/api/code-blocks')
    .then(response => response.json())
    .then(data => {
    setCodeBlocks(data); // directly set the state with the data
    setIsLoading(false);
  });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby codeBlocks={codeBlocks} isLoading={isLoading} />} />
        <Route path="/codeblock/:id" element={<CodeBlock codeBlocks={codeBlocks} />} />
      </Routes>
    </Router>
  );
}

export default App;