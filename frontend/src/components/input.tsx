import axios from "axios";
import { useState } from "react";
interface Entry {
    username: string;
    codeLanguage: string;
    stdin: string;
    sourceCode: string;
    timestamp: string;
  }
export function Input(){
    const [username, setUsername] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('C++');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const entry: Entry = { username, codeLanguage, stdin, sourceCode, timestamp: new Date().toLocaleString() };
    
        axios.post('http://localhost:3000/submit', entry)
          .then(() => {
            setUsername('');
            setStdin('');
            setSourceCode('');
            setCodeLanguage('')
          })
          .catch(error => console.error('Error submitting entry:', error));
      };
    return <div>
        <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required /><br /><br />

        <label htmlFor="codeLanguage">Preferred Code Language:</label>
        <select id="codeLanguage" value={codeLanguage} onChange={e => setCodeLanguage(e.target.value)} required>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
        </select><br /><br />

        <label htmlFor="stdin">Standard Input (stdin):</label>
        <textarea id="stdin" value={stdin} onChange={e => setStdin(e.target.value)} rows={4} cols={50} required /><br /><br />

        <label htmlFor="sourceCode">Source Code:</label><br />
        <textarea id="sourceCode" value={sourceCode} onChange={e => setSourceCode(e.target.value)} rows={10} cols={50} required /><br /><br />

        <input type="submit" value="Submit" />
        
      </form>
    </div>
}