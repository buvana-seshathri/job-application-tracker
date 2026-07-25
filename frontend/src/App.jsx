import { useEffect, useState } from 'react';  // useState - data that can change, useEffect - runs code after component load
import AddForm from './components/AddForm';
import ApplicationList from './components/ApplicationList';

const API = 'http://localhost:3001/api';

function App() {
  const [applications, setApplications] = useState([]);

  const loadApplications = () => {
    fetch(`${API}/applications`)
      .then((res) => res.json())
      .then(setApplications);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const addApplication = (form) => {
    fetch(`${API}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(loadApplications);
  };

  const updateStatus = (id, status) => {
    fetch(`${API}/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).then(loadApplications);
  };

  const deleteApplication = (id) => {
    fetch(`${API}/applications/${id}`, { method: 'DELETE' }).then(loadApplications);
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">🎯 Job Tracker</h1>

        <AddForm onAdd={addApplication} />

        <ApplicationList
          applications={applications}
          onStatusChange={updateStatus}
          onDelete={deleteApplication}
        />
      </div>
    </div>
  );
}

export default App;