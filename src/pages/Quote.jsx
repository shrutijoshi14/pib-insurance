import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const insuranceTypes = [
  'Group Health Insurance', 'Group Personal Accident', 'Group Term Insurance', 'Group Travel Insurance',
  'Liability Insurance', 'Marine Insurance', 'Property Insurance', 'Fire Insurance',
  'Term Insurance', 'Health Insurance', 'Home Insurance', 'Motor Insurance', 'Travel Insurance', 'Accidental Insurance',
];

export default function Quote() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', insuranceType: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, error: '' });
        setForm({ name: '', phone: '', email: '', insuranceType: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'Submission failed.' });
      }
    } catch {
      setStatus({ loading: false, success: false, error: 'Could not connect to server. Please try again.' });
    }
  };

  return (
    <div className="bg-[#f4f8fd] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy to-navy-light py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Get a Quote</h1>
        <p className="text-white/70 max-w-xl mx-auto">Fill in your details and our experts will reach out with the best plan for you.</p>
        <div className="flex justify-center gap-2 mt-4 text-sm text-white/50">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-white">Get a Quote</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          {status.success ? (
            <div className="text-center py-14">
              <CheckCircle size={56} className="text-green-500 mx-auto mb-5" />
              <h2 className="text-3xl font-black text-navy mb-3">Quote Request Sent!</h2>
              <p className="text-gray-500">Thank you! Our team will contact you shortly with the best-suited plan.</p>
              <button onClick={() => setStatus({ loading: false, success: false, error: '' })}
                className="mt-6 text-blue-nav font-semibold hover:underline text-sm">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl font-black text-navy mb-6">Request a Call Back</h2>

              {status.error && (
                <div className="flex items-center gap-3 bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm">
                  <AlertCircle size={18} />
                  {status.error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Full Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-nav focus:ring-2 focus:ring-blue-nav/20 transition-colors"
                    placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Phone Number *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-nav focus:ring-2 focus:ring-blue-nav/20 transition-colors"
                    placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-nav focus:ring-2 focus:ring-blue-nav/20 transition-colors"
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Insurance Type *</label>
                  <select required value={form.insuranceType} onChange={e => setForm({...form, insuranceType: e.target.value})}
                    className="w-full border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-nav focus:ring-2 focus:ring-blue-nav/20 transition-colors bg-white text-gray-500">
                    <option value="" disabled>Select insurance type</option>
                    {insuranceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Additional Details</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-nav focus:ring-2 focus:ring-blue-nav/20 transition-colors resize-none"
                  placeholder="Share any specific requirements or questions..." />
              </div>

              <button type="submit" disabled={status.loading}
                className="w-full bg-navy hover:bg-navy-light text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60 tracking-wide">
                {status.loading
                  ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><Send size={18} /> Get My Free Quote</>
                }
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
