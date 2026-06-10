import React, { useState } from 'react';
import { Upload, Loader2, CheckCircle2 } from 'lucide-react';

export default function CareerForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'Registered Nurse (RN) BSN',
    experienceYears: '3-5 Years',
    resumeText: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const reportText = fileName 
        ? `[Attached: ${fileName}] ${form.resumeText}` 
        : form.resumeText;

      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          resumeText: reportText
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(data.message);
        setForm({
          fullName: '',
          email: '',
          phone: '',
          position: 'Registered Nurse (RN) BSN',
          experienceYears: '3-5 Years',
          resumeText: '',
          message: ''
        });
        setFileName(null);
      } else {
        alert(data.error || "A processing incident occurred. Please try again.");
      }
    } catch {
      alert("Recruiting database connectivity concern. Please contact careers@ambiancejoy.com.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-teal-50 border border-teal-100 rounded-3xl p-8 text-center space-y-4 animate-fade-in" id="career-success-state">
        <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto text-[18px]">
          ✓
        </div>
        <div>
          <h4 className="text-sm font-bold text-teal-950 font-sans">Application Received</h4>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Thank you! Your nurse credentials have been routed directly to our Lead Clinical Director. We typically reach out for interviews within 48 business hours.
          </p>
        </div>
        <button
          onClick={() => setSuccess(null)}
          className="text-xs font-semibold text-teal-700 hover:text-teal-950 underline cursor-pointer"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans" id="career-vocation-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Full Name</label>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => setForm(p => ({ ...p, fullName: e.target.value }))}
            placeholder="Elizabeth Avery, RN"
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
            placeholder="(832) 555-0199"
            className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Email Address</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
            placeholder="elizabeth@example.com"
            className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Position Vetting</label>
          <select
            value={form.position}
            onChange={(e) => setForm(p => ({ ...p, position: e.target.value }))}
            className="w-full text-xs font-semibold text-slate-700 bg-slate-50/50 border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 outline-none transition-all focus:bg-white cursor-pointer"
          >
            <option>Registered Nurse (RN) BSN</option>
            <option>Licensed Vocational Nurse (LVN)</option>
            <option>Certified Nursing Assistant (CNA)</option>
            <option>Companion Care & Wellness Aides</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Years of Care Practice</label>
        <select
          value={form.experienceYears}
          onChange={(e) => setForm(p => ({ ...p, experienceYears: e.target.value }))}
          className="w-full text-xs font-semibold text-slate-700 bg-slate-50/50 border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 outline-none transition-all focus:bg-white cursor-pointer"
        >
          <option>1-2 Years</option>
          <option>3-5 Years</option>
          <option>6-9 Years</option>
          <option>10+ Years Professional Experience</option>
        </select>
      </div>

      {/* Modern dashed Drag & Drop file attachment UI */}
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Attach Resume Info (PDF/DOC/DOCX)</label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
            dragActive ? 'border-teal-500 bg-teal-50/40' : 'border-slate-200 hover:border-teal-400 bg-slate-50/50'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-1">
            <Upload className="w-5 h-5 text-teal-600 mb-1" />
            {fileName ? (
              <div className="text-xs">
                <span className="text-teal-800 font-bold">Attached:</span>{' '}
                <strong className="text-slate-950 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-100 italic">
                  {fileName}
                </strong>
              </div>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                Drag and drop your file here, or{' '}
                <label className="text-teal-600 hover:text-teal-700 underline cursor-pointer font-bold inline hover:underline">
                  browse files
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </span>
            )}
            <span className="text-[10px] text-slate-400">Maximum size 5MB</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans">credentials or healthcare philosophy</label>
        <textarea
          rows={2}
          value={form.resumeText}
          onChange={(e) => setForm(p => ({ ...p, resumeText: e.target.value }))}
          placeholder="Briefly share specialized techniques (e.g. Memory training, ICU, PICC line support) or why you practice healthcare..."
          className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 hover:translate-y-[ -1px] cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Routing Vetting Pack...</span>
          </>
        ) : (
          <span>Verify & Submit Vocation Inquiry</span>
        )}
      </button>
    </form>
  );
}
