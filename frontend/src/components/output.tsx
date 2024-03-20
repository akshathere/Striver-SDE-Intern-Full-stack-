import axios from "axios";
import { useEffect, useState } from "react";

export function Output(){
    interface Entry {
        username: string;
        codeLanguage: string;
        stdin: string;
        sourceCode: string;
        timestamp: string;
      }
    const [entries, setEntries] = useState<Entry[]>([]);
    useEffect(() => {
        fetchEntries();
      }, []);
      const fetchEntries = () => {
        axios.get('http://localhost:3000/entries')
          .then(response => setEntries(response.data))
          .catch(error => console.error('Error fetching entries:', error));
      };
    return <div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-gradient-to-r from-slate-900 to-sky-800 h-screen">
    <div className="antialiased text-neutral-800 dark:text-neutral-200 bg-white dark:bg-gradient-to-r from-slate-900 to-sky-800 text-white p-4  shadow-lg">
    <h1 className="text-2xl font-bold mb-4">Entries</h1>
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Username</th>
          <th className="px-4 py-2">Code Language</th>
          <th className="px-4 py-2">Stdin</th>
          <th className="px-4 py-2">Timestamp</th>
          <th className="px-4 py-2">Source Code</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index} className="bg-black border border-white">
            <td className="px-4 py-2">{entry.username}</td>
            <td className="px-4 py-2">{entry.codeLanguage}</td>
            <td className="px-4 py-2">{entry.stdin}</td>
            <td className="px-4 py-2">{entry.timestamp}</td>
            <td className="px-4 py-2">{entry.sourceCode.substring(0, 100)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  
}