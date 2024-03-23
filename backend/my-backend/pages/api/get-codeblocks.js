import { connectDB } from '../../utils/db';
import CodeBlock from '../../models/CodeBlock';

export default async function handler(req, res) {
  await connectDB(); 
  
  try {
    const codeBlocks = await CodeBlock.find({}); // Fetch all code blocks
    res.status(200).json(codeBlocks);
  } catch (error) {
    console.error('Error fetching code blocks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



// const codeBlocks = [
//   { id: 1 , title: 'Missing Semicolon', code: 'function greet(name) { alert("Hello, " + name) }', corectCode: 'function greet(name) { alert("Hello, " + name); '},
//   { id: 2 ,title: 'Incorrect Variable Declaration', code: 'let age = 25; console.log(age);', corectCode: 'let age = 25; console.log(age);'},
//   { id: 3 ,title: 'Syntax Error in Loop', code: 'for (i = 0; i < 5; i++) { console.log(i); }', corectCode: 'for (let i = 0; i < 5; i++) { console.log(i); '},
//   { id: 4 ,title: 'Undefined Function Call', code: 'sayHello(); function sayHello() { console.log("Hello!"); }', corectCode: 'function sayHello() { console.log("Hello!"); } sayHello();'},
// ];

// connectDB(); 
  
// codeBlocks.forEach(async (block) => {
//   const newBlock = new CodeBlock(block);
//   await newBlock.save();
// });