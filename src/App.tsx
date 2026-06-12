import React, { useState, useEffect } from 'react';
import { Calendar, X, AlertCircle } from 'lucide-react';

// Core layout-level Components
import Header from './components/Header';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import BookingForm from './components/BookingForm';

// Modular Page Components
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

// Static Data & Types
import { SERVICES_DATA, TESTIMONIALS } from './data';
import { ActiveTab, TestimonialItem } from './types';

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
    // 1. Initial Load Hash Routing Sync
    const initialTab = hashToTab(window.location.hash);
    setActiveTabInternal(initialTab);
    
    // Set default hash if empty
    if (!window.location.hash || window.location.hash === '') {
      window.location.hash = '#/';
    }

    // 2. Hash Change event listener for back/forward buttons
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

  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream/10 text-slate-800 font-sans selection:bg-brand-purple selection:text-white" id="sleek-houston-care-app">
      
      {/* Top sticky header navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openBookingModal={() => setBookingModalOpen(true)} 
      />

      {/* Main client application view router depending on header callback active tab */}
      <main className="flex-1">
        {activeTab === 'Home' && (
          <Home 
            setActiveTab={setActiveTab}
            setBookingModalOpen={setBookingModalOpen}
            setSelectedServiceId={setSelectedServiceId}
          />
        )}

        {activeTab === 'Services' && (
          <Services 
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={setSelectedServiceId}
            setBookingModalOpen={setBookingModalOpen}
          />
        )}

        {activeTab === 'About' && (
          <About />
        )}

        {activeTab === 'Testimonials' && (
          <Testimonials 
            testimonialsList={testimonialsList}
            onAddReview={handleAddReview}
          />
        )}

        {activeTab === 'Careers' && (
          <Careers />
        )}

        {activeTab === 'Contact' && (
          <Contact 
            initialService={selectedService.title}
          />
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
          <div className="bg-white border border-brand-cream-dark text-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative">
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-950 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-brand-purple text-left">
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
            <div className="p-6 text-center space-y-4 text-left font-sans text-xs">
              <div className="mx-auto w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center border border-red-200 animate-pulse">
                <AlertCircle className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-950 uppercase tracking-tight leading-none text-center">Emergency Service On-Call</h3>
              <p className="text-slate-500 leading-relaxed font-semibold">
                If this represents a life-threatening physical or medical emergency, please call <strong>911</strong> immediately.
              </p>
              <p className="text-slate-700 leading-relaxed font-semibold">
                To reach our 24/7 helpline or discuss urgent hospital discharge setups directly with our on-duty coordinator:
              </p>
              
              <div className="py-1">
                <a 
                  href="tel:8328147008" 
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-base tracking-tight py-3 px-5 rounded-xl block shadow-lg hover:shadow-xl transition-all cursor-pointer text-center"
                >
                  📞 (832) 814-7008
                </a>
              </div>

              <span className="block text-center text-[10px] text-slate-400 mt-2">Ambiance Joy Nursing Services • Houston, TX</span>
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
