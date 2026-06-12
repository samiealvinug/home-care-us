import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import CareerForm from '../components/CareerForm';

export default function Careers() {
  return (
    <div className="animate-fade-in py-12 px-4 max-w-5xl mx-auto space-y-12" id="careers-tab-screen">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="block text-[10px] font-bold text-brand-purple uppercase tracking-widest font-mono">Join Our Force</span>
        <h1 className="text-3xl font-serif text-brand-navy leading-tight">Embark on a Warm Care Career</h1>
        <p className="text-slate-500 text-xs">We align with certified caregivers, nurses, and care aides looking for schedules with purpose.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-brand-navy">Vocation Advantages:</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal font-sans">
              We maintain a safe, welcoming, and empowering caregiver standard, offering ongoing professional nurse supervision and flexible schedules.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: "Competitive Wages", text: "Excellent base rates, travel allowances, and overnight differentials." },
              { label: "Unmatched Schedule Customization", text: "Setup short nurse visits, weekend companion shifts, or part-time hours." },
              { label: "RN Professional Guidance", text: "Free continuing training, and mentoring directed by our Clinical Lead." }
            ].map((perk, i) => (
              <div key={i} className="flex gap-3 p-3 bg-white border border-brand-cream-dark rounded-xl shadow-sm">
                <div className="bg-brand-cream text-brand-teal p-1.5 h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-brand-navy">{perk.label}</h4>
                  <span className="text-[11px] text-slate-500 leading-normal block font-normal">{perk.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0a2540] text-slate-300 p-5 rounded-2xl space-y-2 text-xs">
            <h4 className="text-white font-bold leading-none mb-1 font-sans uppercase tracking-wider text-[10px] text-brand-teal">Standard Open Roles Reviewing:</h4>
            <ul className="space-y-1.5 text-slate-300 font-medium list-none">
              <li>➔ Registered Nurse (RN) BSN Visits</li>
              <li>➔ Licensed Vocational Nurse (LVN)</li>
              <li>➔ Certified Nursing Assistant (CNA)</li>
              <li>➔ Companion Care Associate</li>
            </ul>
          </div>

          <div className="w-full h-48 rounded-2xl overflow-hidden relative shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600&h=400" 
              alt="Work at Ambiance Joy Nursing Services"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 to-transparent" />
            <span className="absolute bottom-4 left-4 bg-brand-purple text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
              Join Our Caring Team
            </span>
          </div>
        </div>

        {/* Vetting recruiter tool form */}
        <div className="lg:col-span-7 bg-white border border-brand-cream-dark rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="text-left space-y-1 mb-5">
            <h3 className="text-base font-bold text-brand-navy font-serif">Recruiting Vetting Form</h3>
            <p className="text-xs text-slate-400">Submit your coordinates, credentials, and experience level below for review.</p>
          </div>
          <CareerForm />
        </div>

      </div>
    </div>
  );
}
