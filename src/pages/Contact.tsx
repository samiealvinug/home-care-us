import React from 'react';
import { Phone, MapPin, CheckCircle2, Heart } from 'lucide-react';
import BookingForm from '../components/BookingForm';

interface ContactProps {
  initialService: string;
}

export default function Contact({ initialService }: ContactProps) {
  return (
    <div className="animate-fade-in py-12 px-4 max-w-5xl mx-auto space-y-12" id="contact-tab-screen">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="block text-[10px] font-bold text-brand-purple uppercase tracking-widest font-mono">Contact Our Intake Team</span>
        <h1 className="text-3xl font-serif text-brand-navy leading-tight">Ambiance Joy Nursing Services</h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          We are here to answer your questions and help you find the right care solution for your loved one.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 space-y-5 text-left">
          <div className="bg-[#0a2540] text-white rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-teal font-sans">Providing Care with Compassion, Comfort, and Joy</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              “Because every person deserves to feel at home, cared for, and valued"
            </p>

            <div className="space-y-4 text-xs font-medium">
              <div className="flex gap-2.5">
                <Phone className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Call 24/7 Helpline:</strong>
                  <a href="tel:8328147008" className="text-brand-teal font-extrabold text-sm block mt-0.5 hover:underline">(832) 814-7008</a>
                </div>
              </div>

              <div className="flex gap-2.5 border-t border-slate-700 pt-3.5">
                <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Administration Venue:</strong>
                  <span className="text-slate-300 block mt-0.5 leading-normal">
                    4020 Saint Peter Lane, Houston, TX 77045
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-1">Conferences by clinician appointment only.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-cream border border-brand-cream-dark rounded-xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 animate-pulse" />
            <div className="text-xs text-brand-navy leading-normal text-left font-semibold">
              <strong>Texas HHS Registered Facility ID #7008</strong>
              <span className="block text-slate-500 text-[11px] font-normal">Fully Bonded, Insured, and Medicare Compliant.</span>
            </div>
          </div>
        </div>

        {/* Consultation Booking form column */}
        <div className="lg:col-span-7 bg-white border border-brand-cream-dark rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="text-left space-y-1 mb-5">
            <h3 className="text-base font-bold text-brand-navy font-serif">Request Free Consultation</h3>
            <p className="text-xs text-slate-400">Complete the request below and our Lead Coordinating RN will call you.</p>
          </div>
          <BookingForm initialService={initialService} />
        </div>

      </div>

      {/* Simulated Clean Map Illustration */}
      <section className="bg-white border border-brand-cream-dark rounded-2xl overflow-hidden shadow-md p-4 text-left" id="map-mockup-wrapper">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-brand-cream-dark pb-3.5 mb-3.5 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="text-brand-purple w-4 h-4 animate-bounce" />
              <span>Ambiance Joy Service Coordinates</span>
            </h3>
            <span className="text-xs text-slate-500 block mt-0.5">4020 Saint Peter Lane, Houston, TX 77045</span>
          </div>
          <a 
            href="https://maps.google.com/?q=4020+Saint+Peter+Lane,+Houston,+TX+77045"
            target="_blank"
            rel="noreferrer"
            className="bg-brand-cream hover:bg-brand-cream-dark border border-brand-cream-dark text-brand-navy px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            View on Google Maps
          </a>
        </div>

        {/* Minimalist Vector SVG Map */}
        <div className="h-60 bg-gradient-to-br from-indigo-50/20 to-teal-50/20 rounded-xl relative border border-slate-100 overflow-hidden flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-slate-200" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="120" x2="1000" y2="120" stroke="currentColor" strokeWidth="4" strokeDasharray="5" />
            <line x1="0" y1="180" x2="1000" y2="200" stroke="currentColor" strokeWidth="5" />
            <line x1="450" y1="0" x2="450" y2="500" stroke="currentColor" strokeWidth="3" />
            <text x="20" y="110" fill="#94a3b8" className="text-[9px] uppercase tracking-wider font-bold">IH-610 Loop</text>
            <text x="30" y="175" fill="#94a3b8" className="text-[9px] uppercase tracking-wider font-bold">Hwy 288</text>
          </svg>

          <div className="absolute top-6 left-12 text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded shadow-sm border border-slate-150">The Heights</div>
          <div className="absolute top-12 right-12 text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded shadow-sm border border-slate-150">Medical Center</div>
          <div className="absolute bottom-12 left-12 text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded shadow-sm border border-slate-150">Sugar Land</div>

          {/* Main pin centered */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-brand-purple text-white font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest leading-none flex items-center gap-1 shadow-lg border border-white cursor-default selection:bg-transparent select-none">
              <Heart className="w-2.5 h-2.5 fill-white/10" />
              <span>Ambiance Joy Hub</span>
            </div>
            <div className="w-2 h-2 bg-brand-purple rounded-full border-2 border-white animate-ping mt-1" />
          </div>
        </div>
      </section>

    </div>
  );
}
