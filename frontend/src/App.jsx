import { useEffect, useState } from 'react'; // useState - data that can change, useEffect - runs code after component load

const API = 'http://localhost:3001/api';

function App() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({ company: '', role: '', category: '', applied_date: '' });

  const loadApplications = () => {
    fetch(`${API}/applications`)
      .then((res) => res.json())
      .then(setApplications);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // ...form -> copy all the previous data and just update one change mentioned
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the defualt action -> submit then reload page; instead call loadApplications() -> refresh without complete page reload
    fetch(`${API}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ company: '', role: '', category: '', applied_date: '' });
      loadApplications();
    });
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Job Tracker (Phase 2)</h1>

      <form onSubmit={handleSubmit}>
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
        <input name="category" placeholder="Category (e.g. SDE)" value={form.category} onChange={handleChange} required />
        <input name="applied_date" type="date" value={form.applied_date} onChange={handleChange} required />
        <button type="submit">Add Application</button>
      </form>

      <hr />

      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <b>{app.company}</b> — {app.role} ({app.category}) — status: {app.status}
            <select value={app.status} onChange={(e) => updateStatus(app.id, e.target.value)}>
              <option value="submitted">submitted</option>
              <option value="callback">callback</option>
              <option value="interviewing">interviewing</option>
              <option value="offer">offer</option>
              <option value="rejected">rejected</option>
            </select>
            <button onClick={() => deleteApplication(app.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
