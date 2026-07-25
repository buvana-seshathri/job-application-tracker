import { useEffect, useState } from 'react'; // useState - data that can change, useEffect - runs code after component load

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:3001/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Could not reach backend. Is it running?'));
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Job Tracker</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default App;
