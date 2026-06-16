import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data';

interface BookingFormProps {
  initialService?: string;
  onSuccess?: (message: string) => void;
}

export default function BookingForm({ initialService = 'Skilled Nursing', onSuccess }: BookingFormProps) {
  const [form, setForm] = useState({
    clientName: '',
    phone: '',
    email: '',
    service: initialService,
    preferredDate: '',
    preferredTime: '10:00 AM',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message);
        if (onSuccess) {
          onSuccess(data.message);
        }
        setForm({
          clientName: '',
          phone: '',
          email: '',
          service: 'Skilled Nursing',
          preferredDate: '',
          preferredTime: '10:00 AM',
          message: ''
        });
      } else {
        setErrorMsg(data.error || "A submission mismatch occurred. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network connection error. Please call us directly at (832) 506-5024.");
    } finally {
      setSubmitting(false);
    }
  };

  if (successMsg) {
    return (
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 text-center space-y-4 animate-fade-in" id="booking-success-wrapper">
        <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto text-lg">
          ✓
        </div>
        <div>
          <h4 className="text-sm font-bold text-teal-950 font-sans">Consultation Scheduled</h4>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Thank you! A clinical nurse coordinator will call you to confirm your assessment date and review your care plan details.
          </p>
        </div>
        <button 
          onClick={() => setSuccessMsg(null)}
          className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline cursor-pointer"
        >
          Book another consultation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left" id="consultation-booking-form">
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-800 text-xs rounded-xl font-medium">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Full Name</label>
          <input
            type="text"
            required
            value={form.clientName}
            onChange={(e) => setForm(p => ({ ...p, clientName: e.target.value }))}
            placeholder="Jane Doe (or Loved One's Name)"
            className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Contact Phone</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
            placeholder="(832) 555-0100"
            className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Email Address (Optional)</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
            placeholder="email@example.com"
            className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Service Requested</label>
          <select
            value={form.service}
            onChange={(e) => setForm(p => ({ ...p, service: e.target.value }))}
            className="w-full text-xs font-semibold text-slate-700 bg-slate-50/50 border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 outline-none transition-all focus:bg-white cursor-pointer"
          >
            {SERVICES_DATA.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Preferred Date</label>
          <input
            type="date"
            required
            value={form.preferredDate}
            onChange={(e) => setForm(p => ({ ...p, preferredDate: e.target.value }))}
            className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all focus:bg-white cursor-pointer"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Preferred Time</label>
          <input
            type="text"
            value={form.preferredTime}
            onChange={(e) => setForm(p => ({ ...p, preferredTime: e.target.value }))}
            placeholder="e.g. 10:00 AM or Morning"
            className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Care Needs / Specific Concerns</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
          placeholder="Describe physical safety concerns, diagnoses, mobility aids, or recovery history."
          className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-950 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 hover:translate-y-[-1px] cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-400" />
            <span>Scheduling Assessment...</span>
          </>
        ) : (
          <span>Book Free Home Assessment</span>
        )}
      </button>

      <p className="text-[10px] text-slate-400 text-center font-medium mt-1">
        ✓ Fully licensed and state-compliant health structures. Your privacy is guaranteed.
      </p>
    </form>
  );
}
