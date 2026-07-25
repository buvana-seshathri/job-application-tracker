import { useState } from 'react';

function ReachoutForm({ onAdd }) {
  const [form, setForm] = useState({
    person_name: '',
    company: '',
    reached_out_date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ ...form, person_name: '', company: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-3 items-end">
      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Person's name</label>
        <input
          name="person_name"
          value={form.person_name}
          onChange={handleChange}
          required
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Company</label>
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Date</label>
        <input
          type="date"
          name="reached_out_date"
          value={form.reached_out_date}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg px-5 py-2 transition-colors"
      >
        Log Reachout
      </button>
    </form>
  );
}

export default ReachoutForm;
