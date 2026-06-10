import React, { useState, useEffect } from 'react';
import { 
  Heart, Phone, MapPin, Shield, Clock, Stethoscope, HeartHandshake, 
  UserCheck, Pill, Sparkles, Activity, Star, ChevronRight, X, Calendar, 
  AlertCircle, CheckCircle2, Award, ArrowRight, BrainCircuit
} from 'lucide-react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import AssessmentTool from './components/AssessmentTool';
import CareerForm from './components/CareerForm';
import ReviewForm from './components/ReviewForm';
import LiveChat from './components/LiveChat';

// Data & Types
import { SERVICES_DATA, CARE_TEAM, TESTIMONIALS, FAMILY_RESOURCES } from './data';
import { ActiveTab, TestimonialItem } from './types';

const SERVICE_IMAGES: Record<string, string> = {
  'residential-care': 'https://images.unsplash.com/photo-1576765608622-46748db38e75?auto=format&fit=crop&q=80&w=600&h=400',
  'nursing-care': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600&h=400',
  'elderly-care': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600&h=400',
  'personal-care': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600&h=400',
  'respite-care': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600&h=400',
  'dementia-specialized': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600&h=400'
};

const tabToHash = (tab: ActiveTab): string => {
  if (tab === 'Home') return '#/';
  return `#/${tab.toLowerCase()}`;
};

const hashToTab = (hash: string): ActiveTab => {
  const cleanHash = hash.replace('#/', '').replace('#', '').trim().toLowerCase();
  switch (cleanHash) {
    case '':
    case 'home':
      return 'Home';
    case 'about':
      return 'About';
    case 'services':
      return 'Services';
    case 'careers':
      return 'Careers';
    case 'testimonials':
    case 'success-stories':
      return 'Testimonials';
    case 'contact':
      return 'Contact';
    default:
      return 'Home';
  }
};

export default function App() {
  const [activeTab, setActiveTabInternal] = useState<ActiveTab>('Home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeBookings, setActiveBookings] = useState<any[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>(TESTIMONIALS);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('residential-care');
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabInternal(tab);
    const targetHash = tabToHash(tab);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  useEffect(() => {
    // 1. Initial Load Sync
    const initialTab = hashToTab(window.location.hash);
    setActiveTabInternal(initialTab);
    
    // Set default hash if empty
    if (!window.location.hash || window.location.hash === '') {
      window.location.hash = '#/';
    }

    // 2. Hash Change event listener
    const handleHashChange = () => {
      const currentTab = hashToTab(window.location.hash);
      setActiveTabInternal(currentTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setActiveBookings(data);
      }
    } catch (err) {
      console.log("Failed to fetch bookings status ticker", err);
    }
  };

  const handleAddReview = (newReview: TestimonialItem) => {
    setTestimonialsList([newReview, ...testimonialsList]);
  };

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

  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white" id="sleek-houston-care-app">
      
      {/* Top sticky header navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openBookingModal={() => setBookingModalOpen(true)} 
      />

      {/* Main client application view router depending on header callback active tab */}
      <main className="flex-1">

        {/* ==================== 1. HOME SCREEN ==================== */}
        {activeTab === 'Home' && (
          <div id="home-screen-render" className="animate-fade-in">
            
            {/* Elegant Hero space centered on beautiful design */}
            <section className="relative bg-[#1a2d21] text-white overflow-hidden py-16 lg:py-24 animate-fade-in" id="elegant-hero">
              <div className="absolute inset-0 z-0 opacity-20">
                <img 
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1600" 
                  alt="Houston Care Background"
                  className="w-full h-full object-cover filter brightness-[0.35]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2d21] via-[#1a2d21]/80 to-transparent" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-300 text-xs font-bold rounded-full border border-teal-500/20 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                      Excellence in Home Care
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.15] text-white">
                      Welcome to <br />
                      <span className="italic text-teal-350 font-normal">Ambiance Joy Nursing Services</span>
                    </h1>
                    
                    <p className="text-slate-350 text-xs sm:text-sm max-w-xl leading-relaxed font-normal">
                      At Ambiance Joy Nursing Services, we are dedicated to providing compassionate, professional, and personalized care in a safe and comfortable environment. Our mission is to enhance the quality of life for individuals who require assistance with daily living while maintaining their dignity, independence, and well-being.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button 
                        onClick={() => setBookingModalOpen(true)}
                        className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all hover:translate-y-[-1px] shadow-lg shadow-teal-500/10 cursor-pointer"
                      >
                        Schedule Free Assessment
                      </button>
                      <a 
                        href="tel:8328147008"
                        className="bg-slate-900/80 hover:bg-slate-850 text-white border border-slate-800 font-bold px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Call (832) 814-7008</span>
                      </a>
                    </div>
                  </div>

                  {/* Assessment Matcher Widget */}
                  <div className="lg:col-span-5">
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
            </section>

            {/* Whole-Person Standards Banner */}
            <section className="bg-white border-y border-slate-150 py-8 px-4" id="stats-ribbon">
              <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { value: "500+", label: "Seniors & Families Served" },
                  { value: "98%", label: "Satisfaction Quality Audit" },
                  { value: "24/7", label: "Helpline Clinical Intake" },
                  { value: "Licensed", label: "Texas HHS ID #7008" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center space-y-1 border-r last:border-r-0 border-slate-100 px-4">
                    <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">{stat.value}</div>
                    <div className="text-xs font-medium text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto space-y-12 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-12" id="why-choose-us">
              <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
                <span className="block text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Why Select Ambiance Joy?</span>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">Why Choose Us?</h2>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  We are committed to delivering high-quality nursing and residential care centered around trust, comfort, and positive outcomes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Compassionate & Experienced Caregivers",
                    desc: "Hand-selected, thoroughly vetted professionals carrying years of empathetic care experience."
                  },
                  {
                    title: "Safe, Clean & Comfortable Environment",
                    desc: "Pristine, slip-free, and inviting living layouts tailored for peaceful rest and resident rehabilitation."
                  },
                  {
                    title: "Personalized Care Plans",
                    desc: "Tailored daily support, nursing procedures, and diet setups aligned with individual health needs."
                  },
                  {
                    title: "24/7 Support & Supervision",
                    desc: "Continuous round-the-clock administration and on-duty coordinators always on standby."
                  },
                  {
                    title: "Respect for Dignity, Independence & Privacy",
                    desc: "Procedures designed to support choice and self-care levels with absolute confidentiality."
                  },
                  {
                    title: "Family-Centered Approach",
                    desc: "Continuous scheduled updates and open communication pipelines supporting residents and their loved ones."
                  },
                  {
                    title: "Commitment to Excellence & Professionalism",
                    desc: "Licensed nursing oversight, Texas HHS compliant standards, and ongoing training protocols."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all text-left space-y-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-slate-900 text-white font-mono">
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Home Care Solutions */}
            <section className="bg-[#1a2d21] text-white py-20 px-4">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2 text-left">
                    <span className="block text-xs font-bold text-teal-400 uppercase tracking-widest font-mono">Our Programs</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">Home Health Care Solutions</h2>
                  </div>
                  <button 
                    onClick={() => setActiveTab('Services')}
                    className="group text-teal-350 hover:text-teal-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View all program options</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES_DATA.map((service) => (
                    <div 
                      key={service.id} 
                      className="bg-slate-900/40 rounded-2xl border border-slate-800/85 hover:border-slate-700/80 transition-all flex flex-col justify-between overflow-hidden group text-left shadow-lg"
                    >
                      <div>
                        {/* High Quality Cover Image */}
                        <div className="w-full h-48 overflow-hidden relative border-b border-slate-850">
                          <img 
                            src={SERVICE_IMAGES[service.id] || "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600&h=400"} 
                            alt={service.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 text-teal-400 bg-slate-950/90 p-2 rounded-xl border border-slate-800 transition-all shadow-md">
                            {renderServiceIcon(service.iconName, "w-4 h-4")}
                          </div>
                        </div>

                        <div className="p-6 space-y-2">
                          <h3 className="text-base font-serif font-semibold text-white">{service.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">{service.shortDesc}</p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-0">
                        <button 
                          onClick={() => {
                            setSelectedServiceId(service.id);
                            setActiveTab('Services');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-xs text-teal-400 font-semibold hover:text-white flex items-center justify-start gap-1 cursor-pointer transition-all"
                        >
                          Learn more about benefits ➔
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Dignified Voice Testimonial */}
            <section className="bg-white py-16 px-4 border-y border-slate-100">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <div className="flex justify-center gap-0.5">
                  {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
                </div>
                <blockquote className="text-lg sm:text-xl font-serif text-slate-800 italic leading-relaxed">
                  "Ambiance Joy Nursing Services treated my mother with profound respect. Their caregivers provided professional, reliable care and genuine compassion."
                </blockquote>
                <div>
                  <strong className="block text-xs font-bold text-slate-900 uppercase tracking-wider">Deborah Vance</strong>
                  <span className="text-[10px] text-teal-650 font-bold uppercase tracking-widest mt-1 block font-mono">Daughter of Memory Client • Houston, TX</span>
                </div>
              </div>
            </section>

            {/* Care Blueprint Pathway */}
            <section className="py-20 px-4 max-w-7xl mx-auto space-y-12 font-sans">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="block text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">EASY PROTOCOLS</span>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">Our 4-Step Pathway</h2>
                <p className="text-slate-500 text-xs sm:text-sm">We make planning professional senior care uncomplicated, transparent, and direct.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Free Intake Check", text: "We review diagnoses, specific health concerns, schedules, and clinical goals." },
                  { step: "02", title: "Assessment Plan", text: "A Lead RN coordinates a custom care outline synchronized with your family doctor." },
                  { step: "03", title: "Staff Matching", text: "We pair hand-selected caretakers aligning precisely with certificates and schedules." },
                  { step: "04", title: "Review Audits", text: "We maintain care updates and perform scheduled check-ups." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-left">
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-teal-500/15">
                      {item.step}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pt-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Meet Our Directors */}
            <section className="bg-slate-50/50 border-t border-slate-100 py-20 px-4">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="block text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">DIRECTORS</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">Meet Our Care Directors</h2>
                  <p className="text-slate-500 text-xs sm:text-sm">Experienced clinicians supervising scheduling, safety protocols, and daily quality standards.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {CARE_TEAM.map((member) => (
                    <div 
                      key={member.id} 
                      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between text-left"
                    >
                      <div className="p-6 flex flex-col sm:flex-row gap-5 items-start">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider">{member.experience}</span>
                          <h3 className="text-base font-serif font-bold text-slate-900">{member.name}</h3>
                          <strong className="text-xs text-slate-600 block leading-none font-semibold">{member.role}</strong>
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed italic">"{member.bio}"</p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-1 border-t border-slate-100/50 flex flex-wrap gap-1.5 font-sans mt-2">
                        {member.credentials.map((cred, i) => (
                          <span key={i} className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200/50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{cred}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== 2. SERVICES TAB ==================== */}
        {activeTab === 'Services' && (
          <div className="animate-fade-in py-12 px-4 max-w-6xl mx-auto space-y-12" id="services-tab-screen">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="block text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Licensed Programs</span>
              <h1 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">Home Health Care Options</h1>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                We coordinate personalized healthcare procedures across central Houston, Sugar Land, Pearland, and surrounding neighborhoods.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Selector Column of solutions list */}
              <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-3 shadow-sm grid grid-cols-1 gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3.5 py-2 block text-left">Select a specialty</span>
                {SERVICES_DATA.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`text-left px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                      selectedServiceId === service.id 
                        ? 'bg-teal-600 text-white shadow-md' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {renderServiceIcon(service.iconName, "w-4 h-4")}
                      <span>{service.title}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${selectedServiceId === service.id ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                ))}
              </div>

              {/* Right column with detailed descriptions & guidelines */}
              <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 text-left shadow-sm space-y-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                    {renderServiceIcon(selectedService.iconName, "w-5 h-5")}
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight leading-snug">{selectedService.title}</h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{selectedService.longDesc}</p>
                </div>

                <div className="border-t border-slate-105 pt-5 space-y-3">
                  <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Included Care Highlights:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-normal">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-105 pt-5 space-y-3">
                  <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1">
                    <span>Clinical Q&A</span>
                  </h3>
                  <div className="grid gap-3">
                    {selectedService.faqs.map((faq, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/30 rounded-xl space-y-1">
                        <strong className="block text-xs font-bold text-slate-900">Q: {faq.question}</strong>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inline CTA block pointing to scheduler */}
                <div className="bg-[#1a2d21] text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left space-y-1">
                    <h4 className="text-xs font-bold">Require solutions for {selectedService.title}?</h4>
                    <span className="text-[10px] text-slate-400 block font-medium">Clinical leaders are booking diagnostic consults today.</span>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Request Callback
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== 3. ABOUT US TAB ==================== */}
        {activeTab === 'About' && (
          <div className="animate-fade-in py-12 px-4 max-w-5xl mx-auto space-y-12" id="about-tab-screen">
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch text-left">
              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="block text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">About Us</span>
                  <h1 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">Welcome to Ambiance Joy</h1>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Ambiance Joy Nursing Services is a trusted care home committed to delivering high-quality nursing and residential care. We understand that every individual has unique needs, and our experienced caregivers provide tailored support designed to promote comfort, happiness, and peace of mind for residents and their families.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#1a2d21] border-l-4 border-teal-500 p-5 rounded-xl text-white">
                    <span className="block text-xs font-bold text-teal-400 uppercase tracking-widest font-mono mb-1">Our Mission</span>
                    <p className="text-xs sm:text-sm italic font-normal leading-relaxed">
                      "To provide exceptional nursing and residential care that promotes health, dignity, comfort, and joy for every individual we serve."
                    </p>
                  </div>

                  <div className="bg-slate-900 border-l-4 border-emerald-400 p-5 rounded-xl text-white">
                    <span className="block text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono mb-1">Our Vision</span>
                    <p className="text-xs sm:text-sm italic font-normal leading-relaxed">
                      "To be a leading provider of compassionate care services, recognized for excellence, trust, and positive impact on the lives of residents and their families."
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 min-h-[400px] flex items-end">
                <img 
                  src="https://images.unsplash.com/photo-1576765608622-46748db38e75?auto=format&fit=crop&q=80&w=1000" 
                  alt="Compassionate senior care by Ambiance Joy" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="relative z-10 p-6 sm:p-8 text-white space-y-4 text-left">
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-teal-400 bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-full inline-block">
                    Licensed & Registered Care Home
                  </span>
                  
                  <p className="text-slate-100 text-xs sm:text-sm italic leading-relaxed font-normal">
                    “Because every person deserves to feel at home, cared for, and valued"
                  </p>

                  <div className="pt-2 border-t border-white/15 flex items-center gap-2 text-xs text-white/90 font-bold">
                    <Award className="w-5 h-5 text-teal-400" />
                    <span>Texas Health and Human Services Registered • ID #7008</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Care values display */}
            <section className="space-y-8">
              <div className="text-center space-y-1">
                <span className="block text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Our Principles</span>
                <h2 className="text-2xl font-serif text-slate-900 leading-tight">Our Core Values</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Compassion", desc: "Providing care with deep empathy, warmth, sensitivity, and kind emotional security." },
                  { title: "Respect", desc: "Honoring individual choices, promoting independence, and safeguarding personal privacy." },
                  { title: "Integrity", desc: "Adhering to high ethical standards, transparency, and complete clinical honesty." },
                  { title: "Excellence", desc: "Committed to delivering outstanding standards of nursing and group supportive living." },
                  { title: "Professionalism", desc: "Highly trained, vetted coordinators and qualified care practitioners." },
                  { title: "Accountability", desc: "Taking full responsibility for residential safety, strict schedules, and peace of mind." },
                  { title: "Dignity", desc: "Ensuring every single person feels deeply valued, respected, and treated with utmost care." }
                ].map((p, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-left space-y-2">
                    <span className="font-mono text-xs text-teal-600 font-bold opacity-60">0{i+1}</span>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider block">{p.title}</h3>
                    <p className="text-xs text-slate-500 leading-normal font-normal">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ==================== 4. SUCCESS STORIES ==================== */}
        {activeTab === 'Testimonials' && (
          <div className="animate-fade-in py-12 px-4 max-w-5xl mx-auto space-y-12" id="testimonials-tab-screen">
            <div className="text-center max-w-xl mx-auto space-y-2 col-span-full">
              <span className="block text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Client Experiences</span>
              <h1 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">Verified Community Success Stories</h1>
              <p className="text-slate-500 text-xs sm:text-sm">Read genuine remarks shared by physicians and care coordinators in Houston.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Star reviews listing */}
              <div className="lg:col-span-8 space-y-5 text-left">
                {testimonialsList.map((test) => (
                  <div key={test.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-0.5">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-550 fill-amber-550" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{test.date}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-semibold">
                      "{test.quote}"
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[11px]">
                      <div>
                        <strong className="block text-slate-900 font-bold">{test.author}</strong>
                        <span className="text-slate-400 block mt-0.5">{test.relationship}</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded font-bold">
                        {test.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit feedback sidebar form */}
              <div className="lg:col-span-4 bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="text-left space-y-1">
                  <h3 className="text-sm font-bold text-slate-950">Add Your Experience</h3>
                  <p className="text-xs text-slate-400">Your positive validation assists other Houston families select options with absolute confidence.</p>
                </div>
                <ReviewForm onAddReview={handleAddReview} />
              </div>

            </div>
          </div>
        )}

        {/* ==================== 5. CAREERS TAB ==================== */}
        {activeTab === 'Careers' && (
          <div className="animate-fade-in py-12 px-4 max-w-5xl mx-auto space-y-12" id="careers-tab-screen">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="block text-[10px] font-bold text-teal-600 uppercase tracking-widest font-mono">Join Our Force</span>
              <h1 className="text-3xl font-extrabold text-slate-950 leading-tight">Embark on a Warm Care Career</h1>
              <p className="text-slate-500 text-xs">We align with certified caregivers, nurses, and care aides looking for schedules with purpose.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-950">Vocation Advantages:</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium font-sans">
                    We maintain a safe, welcoming, and empowering caregiver template, offering nurse supervision and flexible schedules.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Competitive Wages", text: "Excellent base rates, travel allowances, and overnight differentials." },
                    { label: "Unmatched Schedule Customization", text: "Setup short nurse visits, weekend companion shifts, or part-time hours." },
                    { label: "RN Professional Guidance", text: "Free continuing training, and mentoring directed by our Clinical Lead." }
                  ].map((perk, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <div className="bg-teal-50 text-teal-600 p-1.5 h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">{perk.label}</h4>
                        <span className="text-[11px] text-slate-500 leading-normal block font-medium">{perk.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950 text-slate-350 p-5 rounded-2xl space-y-2 text-xs">
                  <h4 className="text-white font-bold leading-none mb-1">Standard Open Roles Currently Reviewing:</h4>
                  <ul className="space-y-1.5 text-slate-400 font-medium">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-teal-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                    Join Our Caring Team
                  </span>
                </div>
              </div>

              {/* Vetting recruiter tool form */}
              <div className="lg:col-span-7 bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="text-left space-y-1 mb-5">
                  <h3 className="text-base font-bold text-slate-950">Recruiting Vetting Form</h3>
                  <p className="text-xs text-slate-400">Submit your coordinates, credentials, and experience level below for review.</p>
                </div>
                <CareerForm />
              </div>

            </div>
          </div>
        )}

        {/* ==================== 6. CONTACT TAB ==================== */}
        {activeTab === 'Contact' && (
          <div className="animate-fade-in py-12 px-4 max-w-5xl mx-auto space-y-12" id="contact-tab-screen">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="block text-[10px] font-bold text-teal-600 uppercase tracking-widest font-mono">Contact Us</span>
              <h1 className="text-3xl font-extrabold text-slate-950 leading-tight">Ambiance Joy Nursing Services</h1>
              <p className="text-slate-500 text-xs sm:text-sm">
                We are here to answer your questions and help you find the right care solution for your loved one.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5 space-y-5 text-left">
                <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">Providing Care with Compassion, Comfort, and Joy</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    “Because every person deserves to feel at home, cared for, and valued"
                  </p>

                  <div className="space-y-4 text-xs font-medium">
                    <div className="flex gap-2.5">
                      <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white">Call 24/7 Helpline:</strong>
                        <a href="tel:8328147008" className="text-teal-300 font-bold text-sm block mt-0.5 hover:underline">(832) 814-7008</a>
                      </div>
                    </div>

                    <div className="flex gap-2.5 border-t border-slate-800 pt-3.5">
                      <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
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

                <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 animate-pulse" />
                  <div className="text-xs text-teal-950 leading-normal text-left font-semibold">
                    <strong>Texas HHS Registered Facility ID #7008</strong>
                    <span className="block text-slate-500 text-[11px] font-normal">Fully Bonded, Insured, and Medicare Compliant.</span>
                  </div>
                </div>
              </div>

              {/* Consultation Booking form column */}
              <div className="lg:col-span-7 bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="text-left space-y-1 mb-5">
                  <h3 className="text-base font-bold text-slate-950">Request Free Consultation</h3>
                  <p className="text-xs text-slate-400">Complete required care coordinates. Lead coordinating nurses will call you.</p>
                </div>
                <BookingForm initialService={selectedService.title} />
              </div>

            </div>

            {/* Simulated Clean Map Illustration */}
            <section className="bg-white border rounded-2xl overflow-hidden shadow-sm p-4 text-left" id="map-mockup-wrapper">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3.5 mb-3.5 gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="text-teal-600 w-4 h-4 animate-bounce" />
                    <span>Ambiance Joy Service Coordinates</span>
                  </h3>
                  <span className="text-xs text-slate-450 block mt-0.5">4020 Saint Peter Lane, Houston, TX 77045</span>
                </div>
                <a 
                  href="https://maps.google.com/?q=4020+Saint+Peter+Lane,+Houston,+TX+77045"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  View on Google Maps
                </a>
              </div>

              {/* Minimalist Vector SVG Map */}
              <div className="h-60 bg-gradient-to-br from-indigo-50/20 to-teal-50/20 rounded-xl relative border overflow-hidden flex items-center justify-center">
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
                  <div className="bg-teal-500 text-white font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest leading-none flex items-center gap-1 shadow-lg border border-white cursor-default selection:bg-transparent select-none">
                    <Heart className="w-2.5 h-2.5 fill-white/10" />
                    <span>Ambiance Joy Hub</span>
                  </div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full border-2 border-white animate-ping mt-1" />
                </div>
              </div>
            </section>

          </div>
        )}

      </main>

      {/* Floating emergency callback helper button */}
      <div className="fixed bottom-24 left-6 z-40">
        <button 
          onClick={() => setEmergencyOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-4 py-3 rounded-xl text-xs uppercase tracking-widest shadow-2xl flex items-center gap-1.5 border border-red-500 animate-bounce active:scale-95 transition-transform cursor-pointer"
        >
          <AlertCircle className="w-4 h-4 text-white" />
          <span>On-Call Support</span>
        </button>
      </div>

      {/* Floating chat coordinative bubble widget */}
      <LiveChat />

      {/* Booking consultation overlay modal dialog */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" id="booking-modal-overlay">
          <div className="bg-white border text-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative">
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-950 p-2 rounded-full hover:bg-slate-150 transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-teal-650 text-left">
                <Calendar className="w-5.5 h-5.5 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Schedule Nurse Evaluation</span>
              </div>
              <p className="text-xs text-slate-500 leading-normal text-left font-sans">
                Enter your details to coordinate a professional in-home clinical care checkup. A coordinator will call you to align dates.
              </p>
              
              <BookingForm 
                initialService={selectedService.title} 
                onSuccess={() => setTimeout(() => setBookingModalOpen(false), 2500)} 
              />
            </div>
          </div>
        </div>
      )}

      {/* High-priority triage crisis alert dialog */}
      {emergencyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" id="emergency-modal-overlay">
          <div className="bg-white text-slate-800 border rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative">
            <button 
              onClick={() => setEmergencyOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-950 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            <div className="p-6 text-center space-y-4 text-left font-sans">
              <div className="mx-auto w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center border border-red-200 animate-pulse">
                <AlertCircle className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-950 uppercase tracking-tight leading-none">Emergency Service On-Call</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                If this represents a lifethreatening physical or medical emergency, please call <strong>911</strong> immediately.
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                To reach our 24/7 helpline or discuss urgent hospital discharge setups directly with our on-duty coordinator:
              </p>
              
              <div className="py-1">
                <a 
                  href="tel:8328147008" 
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-base tracking-tight py-3 px-5 rounded-xl block shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  📞 (832) 814-7008
                </a>
              </div>

              <span className="block text-[10px] text-slate-400">Ambiance Joy Nursing Services • Houston, TX</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer copyright, links & newsletter checks */}
      <Footer 
        setActiveTab={setActiveTab} 
        openBookingModal={() => setBookingModalOpen(true)} 
      />

    </div>
  );
}
