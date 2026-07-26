import { useState } from 'react';

const categories = [
  ' ',
  'SWE',
  'ML/AI',
  'DS',
  'DA',
  'Cyber',
  'Cloud',
  'DevOps',
  'QA',
  'PM',
  'UX/UI',
  'Mktg',
  'Sales',
  'Fin',
  'Acct',
  'HR',
  'Ops',
  'SCM',
  'Consult',
  'CS',
  'Health',
  'Edu',
  'Research',
  'Legal',
  'Mfg',
  'Constr',
  'Gov',
  'Hospitality',
  'Retail',
  'Other'
];

function AddForm({ onAdd }) {
  const [form, setForm] = useState({
    company: '',
    role: '',
    category: 'SDE',
    applied_date: new Date().toISOString().slice(0, 10),
    referral: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ ...form, company: '', role: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-3 items-end border-2 border-purple-100"
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Company</label>
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          required
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Role</label>
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Date</label>
        <input
          type="date"
          name="applied_date"
          value={form.applied_date}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-500 pb-2">
        <input type="checkbox" name="referral" checked={form.referral} onChange={handleChange} />
        Referral
      </label>

      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full px-5 py-2 shadow-sm transition-colors"
      >
        + Add Application
      </button>
    </form>
  );
}

export default AddForm;
