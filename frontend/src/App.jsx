import { useEffect, useState } from 'react';
import Tabs from './components/Tabs';
import Dashboard from './components/Dashboard';
import ApplicationsPage from './components/ApplicationsPage';
import ReachoutsPage from './components/ReachoutsPage';
import Toast from './components/Toast';
import CelebrationModal from './components/CelebrationModal';
import { playSubmitSound, playLevelUpSound, playOfferSound } from './utils/sounds';
import { STAGE_LABELS } from './components/StatusProgress';

const API = 'http://localhost:3001/api';

function App() {
  const [applications, setApplications] = useState([]);
  const [reachouts, setReachouts] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState('');
  const [celebration, setCelebration] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const loadApplications = () => {
    fetch(`${API}/applications`)
      .then((res) => res.json())
      .then(setApplications);
  };

  const loadReachouts = () => {
    fetch(`${API}/reachouts`)
      .then((res) => res.json())
      .then(setReachouts);
  };

  useEffect(() => {
    loadApplications();
    loadReachouts();
  }, []);

  const addApplication = (form) => {
    fetch(`${API}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => {
      playSubmitSound();
      showToast('Nice! Application added 🎉');
      loadApplications();
    });
  };

  const updateStatus = (id, status) => {
    fetch(`${API}/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).then(() => {
      if (status === 'offer') {
        playOfferSound();
        setCelebration({ emoji: '🏆', title: 'Offer Received!', subtitle: "You did it — that's huge!" });
      } else if (status !== 'rejected') {
        playLevelUpSound();
        setCelebration({
          emoji: '⬆️',
          title: 'Level Up!',
          subtitle: `Moved to ${STAGE_LABELS[status]}`,
        });
      }
      loadApplications();
    });
  };

  const deleteApplication = (id) => {
    fetch(`${API}/applications/${id}`, { method: 'DELETE' }).then(loadApplications);
  };

  const addReachout = (form) => {
    fetch(`${API}/reachouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(loadReachouts);
  };

  const toggleReachoutResponse = (id, got_response) => {
    fetch(`${API}/reachouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ got_response }),
    }).then(loadReachouts);
  };

  const deleteReachout = (id) => {
    fetch(`${API}/reachouts/${id}`, { method: 'DELETE' }).then(loadReachouts);
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-6">
      <Toast message={toastMessage} />
      <CelebrationModal celebration={celebration} onClose={() => setCelebration(null)} />

      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">🎯 Job Application Tracker</h1>

        <Tabs active={activeTab} onChange={setActiveTab} />

        {activeTab === 'dashboard' && <Dashboard applications={applications} reachouts={reachouts} />}

        {activeTab === 'applications' && (
          <ApplicationsPage
            applications={applications}
            onAdd={addApplication}
            onStatusChange={updateStatus}
            onDelete={deleteApplication}
          />
        )}

        {activeTab === 'reachouts' && (
          <ReachoutsPage
            reachouts={reachouts}
            onAdd={addReachout}
            onToggleResponse={toggleReachoutResponse}
            onDelete={deleteReachout}
          />
        )}
      </div>
    </div>
  );
}

export default App;
