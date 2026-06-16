import React from 'react';
import { Phone, ArrowRight, Heart, Star, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { ActiveTab } from '../types';
import AssessmentTool from '../components/AssessmentTool';
import Logo from '../components/Logo';

interface HomeProps {
  setActiveTab: (tab: ActiveTab) => void;
  setBookingModalOpen: (open: boolean) => void;
  setSelectedServiceId: (id: string) => void;
}

const SERVICE_IMAGES: Record<string, string> = {
  'residential-care': 'https://images.unsplash.com/photo-1576765608622-46748db38e75?auto=format&fit=crop&q=80&w=600&h=400',
  'nursing-care': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600&h=400',
  'elderly-care': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600&h=400',
  'personal-care': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600&h=400',
  'respite-care': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600&h=400',
  'dementia-specialized': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600&h=400'
};

export default function Home({ setActiveTab, setBookingModalOpen, setSelectedServiceId }: HomeProps) {
  return (
    <div className="animate-fade-in bg-brand-cream/30 min-h-screen">
      
      {/* Elegant Hero space centered on beautiful design & brand colors */}
      <section className="relative bg-[#0a2540] text-white overflow-hidden py-16 lg:py-24" id="home-hero">
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1600" 
            alt="Houston Care Background" 
            className="w-full h-full object-cover filter brightness-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540] via-[#0a2540]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-teal/20 text-brand-teal border border-brand-teal/30 text-xs font-bold rounded-full uppercase tracking-widest bg-emerald-50">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse"></span>
                Excellence in Care Homes
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-serif tracking-tight leading-[1.15] text-white">
                Welcome to <br />
                <span className="italic text-brand-teal font-normal font-serif">Ambiance Joy Nursing Services</span>
              </h1>
              
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed font-normal">
                At Ambiance Joy Nursing Services, we provide compassionate, professional, and personalized residential and nursing care. Our mission is to enrich daily life while defending dignity, comfort, and joy for residents and their loved ones in Houston.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => setBookingModalOpen(true)}
                  className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold px-7 py-3 rounded-xl text-xs uppercase tracking-wider transition-all hover:translate-y-[-1px] shadow-lg cursor-pointer"
                >
                  Schedule Free Assessment
                </button>
                <a 
                  href="tel:8325065024"
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold px-7 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Call (832) 506-5024</span>
                </a>
              </div>
            </div>

            {/* Assessment Matcher Widget Column */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-slate-100/50">
                <p className="text-xs font-bold text-brand-purple uppercase tracking-wider mb-2 font-mono">Interactive Diagnosis Helper</p>
                <AssessmentTool 
                  onSelectService={(serviceTitle) => {
                    setSelectedServiceId(
                      SERVICES_DATA.find(s => s.title === serviceTitle)?.id || 'residential-care'
                    );
                    setActiveTab('Services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Identity Accent Block centered with custom SVG Logo */}
      <section className="py-12 bg-white border-b border-brand-cream-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Logo type="full" className="transform scale-100 hover:scale-[1.02] duration-300" />
        </div>
      </section>

      {/* Whole-Person Standards Banner stats */}
      <section className="bg-brand-cream border-y border-brand-cream-dark py-8 px-4" id="stats-ribbon">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Seniors & Families Served", color: "text-brand-purple" },
            { value: "98%", label: "Satisfaction Quality Audit", color: "text-brand-teal" },
            { value: "24/7", label: "Helpline Clinical Intake", color: "text-brand-navy" },
            { value: "Licensed", label: "Texas HHS ID #7008", color: "text-brand-purple" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-1 border-r last:border-r-0 border-brand-cream-dark px-4">
              <div className={`text-xl sm:text-2xl font-serif font-bold ${stat.color} tracking-tight`}>{stat.value}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-12 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8 p-8 sm:p-12 mb-8" id="why-choose-us">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="block text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">Dedicated Companion & Clinical Team</span>
          <h2 className="text-3xl md:text-3xl font-serif text-brand-navy leading-tight">Why Choose Our Care Home?</h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            We are committed to delivering high-quality nursing and residential care centered around trust, family integration, and beautiful living comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Compassionate & Screened Caregivers",
              desc: "Hand-selected, thoroughly background-checked professionals carrying years of empathetic care experience."
            },
            {
              title: "Safe, Clean & Welcoming Environment",
              desc: "Pristine living layouts tailored for peaceful rest and resident rehabilitation."
            },
            {
              title: "Personalized Support Outlines",
              desc: "Tailored daily assistance, nursing procedures, and diet setups aligned with individual health needs."
            },
            {
              title: "24/7 Support & Quality Supervision",
              desc: "Continuous round-the-clock coordination and RN-led oversight for security."
            },
            {
              title: "Respect for Dignity, Independence & Privacy",
              desc: "Procedures designed to support choice and self-care levels with absolute confidentiality."
            },
            {
              title: "Family-Centered Care Approaches",
              desc: "Schedule-syncing dashboards and open communication lines connecting families with on-duty support."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-brand-cream/40 p-6 rounded-2xl border border-brand-cream-dark/60 hover:border-brand-purple/20 transition-all text-left space-y-3 hover:shadow-md">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-brand-teal text-white font-mono">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-bold text-brand-navy leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Program Quick Solutions with brand imagery */}
      <section className="bg-brand-navy text-white py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 text-left">
              <span className="block text-xs font-bold text-brand-teal uppercase tracking-widest font-mono">Our Programs</span>
              <h2 className="text-3xl font-serif text-white leading-tight">Home & Care Home Solutions</h2>
            </div>
            <button 
              onClick={() => setActiveTab('Services')}
              className="group text-brand-teal hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>View all program options</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.slice(0, 3).map((service) => (
              <div 
                key={service.id} 
                className="bg-white/5 rounded-2xl border border-white/10 hover:border-brand-teal/40 transition-all flex flex-col justify-between overflow-hidden group text-left shadow-lg"
              >
                <div>
                  <div className="w-full h-48 overflow-hidden relative">
                    <img 
                      src={SERVICE_IMAGES[service.id] || "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600&h=400"} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-base font-serif font-semibold text-white">{service.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{service.shortDesc}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button 
                    onClick={() => {
                      setSelectedServiceId(service.id);
                      setActiveTab('Services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs text-brand-teal font-semibold hover:text-white flex items-center justify-start gap-1 cursor-pointer transition-all"
                  >
                    Learn more details ➔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dignified Voice Testimonial */}
      <section className="bg-white py-16 px-4 border-y border-brand-cream-dark">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex justify-center gap-0.5">
            {[1,2,3,4,5].map(n => <Star key={n} className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />)}
          </div>
          <blockquote className="text-lg sm:text-xl font-serif text-brand-navy italic leading-relaxed">
            "Ambiance Joy Nursing Services treated my family coordinates with profound respect. Their caregivers provided professional, on-time scheduling, cozy companion care, and absolute security."
          </blockquote>
          <div>
            <strong className="block text-xs font-bold text-brand-navy uppercase tracking-wider">Deborah Vance</strong>
            <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest mt-1 block font-mono">Daughter of Memory Client • Houston, TX</span>
          </div>
        </div>
      </section>

      {/* Care Blueprint Pathway */}
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="block text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">EASY PROTOCOLS</span>
          <h2 className="text-3xl font-serif text-brand-navy leading-tight">Our Simple 4-Step Pathway</h2>
          <p className="text-slate-500 text-xs sm:text-sm">We make planning professional senior and residential care uncomplicated, friendly, and direct.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Free Intake Check", text: "We review diagnoses, specific physical concerns, and family routines." },
            { step: "02", title: "Assessment Plan", text: "A Lead RN coordinates a customized Care Plan alongside family clinicians." },
            { step: "03", title: "Staff Match Setup", text: "We pair certified caregivers aligning precisely with your preferred schedules." },
            { step: "04", title: "Scheduled Audits", text: "Our local coordinators do spot checks and updates to defend daily standards." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-left hover:border-brand-teal/20 transition-all">
              <div className="w-8 h-8 rounded-full bg-brand-teal text-white font-bold flex items-center justify-center text-xs shadow-md">
                {item.step}
              </div>
              <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider pt-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
