import React from 'react';
import { ChevronRight, CheckCircle2, HeartHandshake, Stethoscope, UserCheck, Activity, Pill, Shield, Sparkles, BrainCircuit } from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { ActiveTab } from '../types';

interface ServicesProps {
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
  setBookingModalOpen: (open: boolean) => void;
}

export default function Services({ selectedServiceId, setSelectedServiceId, setBookingModalOpen }: ServicesProps) {
  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const renderServiceIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'UserCheck': return <UserCheck className={className} />;
      case 'BrainCircuit': return <BrainCircuit className={className} />;
      case 'Pills': return <Pill className={className} />;
      case 'ShieldHeart': return <Shield className={className} />;
      case 'Activity': return <Activity className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <div className="animate-fade-in py-12 px-4 max-w-6xl mx-auto space-y-12" id="services-tab-screen">
      
      {/* Title & header context with brand coordination */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="block text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">Licensed Solutions</span>
        <h1 className="text-3xl md:text-4xl font-serif text-brand-navy leading-tight">Home & Care Home Programs</h1>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          We coordinate expert personalized care procedures across central Houston, Sugar Land, Pearland, and surrounding neighborhoods.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Selector Column of details list */}
        <div className="lg:col-span-4 bg-white border border-brand-cream-dark rounded-2xl p-3 shadow-md grid grid-cols-1 gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3.5 py-2 block text-left font-mono">Select a specialty</span>
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
              className={`text-left px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                selectedServiceId === service.id 
                  ? 'bg-brand-purple text-white shadow-md' 
                  : 'text-[#0a2540] hover:bg-brand-cream'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${selectedServiceId === service.id ? 'text-white' : 'text-brand-teal'}`}>
                  {renderServiceIcon(service.iconName, "w-4 h-4")}
                </span>
                <span>{service.title}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 ${selectedServiceId === service.id ? 'text-white' : 'text-slate-400'}`} />
            </button>
          ))}
        </div>

        {/* Right column with detailed descriptions & guidelines */}
        <div className="lg:col-span-8 bg-white border border-brand-cream-dark rounded-2xl p-6 sm:p-8 text-left shadow-md space-y-6">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-brand-cream border border-brand-cream-dark rounded-xl flex items-center justify-center text-brand-teal font-extrabold shadow-sm">
              {renderServiceIcon(selectedService.iconName, "w-5 h-5")}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-navy tracking-tight leading-snug">{selectedService.title}</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{selectedService.longDesc}</p>
          </div>

          <div className="border-t border-brand-cream-dark pt-5 space-y-3">
            <h3 className="text-[10px] font-bold text-brand-purple uppercase tracking-widest font-mono">Included Care Highlights:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedService.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-normal">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-brand-cream-dark pt-5 space-y-3">
            <h3 className="text-[10px] font-bold text-brand-purple uppercase tracking-widest flex items-center gap-1 font-mono">
              <span>Clinical Q&A</span>
            </h3>
            <div className="grid gap-3">
              {selectedService.faqs.map((faq, idx) => (
                <div key={idx} className="p-3.5 bg-brand-cream/40 border border-brand-cream-dark rounded-xl space-y-1">
                  <strong className="block text-xs font-bold text-brand-navy">Q: {faq.question}</strong>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inline CTA block pointing to scheduler */}
          <div className="bg-brand-navy text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <h4 className="text-xs font-bold font-sans">Require professional solutions for {selectedService.title}?</h4>
              <span className="text-[10px] text-slate-350 block font-normal leading-relaxed">Our Licensed Nurses are booking diagnostic consultations today.</span>
            </div>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="bg-brand-teal hover:bg-brand-teal/90 text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
            >
              Request Callback
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
