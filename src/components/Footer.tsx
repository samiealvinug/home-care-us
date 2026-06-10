import React from 'react';
import { Heart, MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openBookingModal: () => void;
}

export default function Footer({ setActiveTab, openBookingModal }: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800" id="premium-app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Col 1: About / Contact Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="bg-teal-500 text-white p-2 rounded-lg">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="block font-sans text-base font-extrabold text-white leading-tight">
                Ambiance Joy
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-widest text-teal-400 font-bold leading-none">
                Nursing Services
              </span>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Nurturing independence, providing professional clinical oversight, and delivering peace of mind to Houston families, licensed and insured for excellence.
          </p>

          <div className="grid gap-3.5 text-sm font-medium">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <span className="text-slate-300">4020 Saint Peter Lane, <br />Houston, TX 77045</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-teal-400 shrink-0" />
              <a href="tel:8328147008" className="hover:text-white transition-colors text-slate-200 font-semibold">(832) 814-7008</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-teal-400 shrink-0" />
              <a href="mailto:care@ambiancejoy.com" className="hover:text-white transition-colors">care@ambiancejoy.com</a>
            </div>
          </div>
        </div>

        {/* Col 2: In-Home Services Quick Links */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Care Services</h3>
          <ul className="grid gap-2.5 text-sm">
            {[
              "Skilled Nursing Care",
              "Personal Care Support",
              "Companion Friendship",
              "Dementia & Alzheimer's Care",
              "Medication Reminders",
              "Respite Short-term Recovery",
              "Transition Assistance"
            ].map((service, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => setActiveTab('Services')}
                  className="hover:text-teal-400 transition-colors text-left text-slate-400 hover:translate-x-1 duration-200 transform inline-block"
                >
                  {service}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Company Sitemap & Highlights */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Quick Links</h3>
          <ul className="grid gap-2.5 text-sm">
            {[
              { label: "Home Base", tab: "Home" as ActiveTab },
              { label: "About Our Mission", tab: "About" as ActiveTab },
              { label: "Our Solutions", tab: "Services" as ActiveTab },
              { label: "Family Testimonials", tab: "Testimonials" as ActiveTab },
              { label: "Careers (Apply Now)", tab: "Careers" as ActiveTab },
              { label: "Get In Touch", tab: "Contact" as ActiveTab }
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setActiveTab(link.tab)}
                  className="hover:text-teal-400 transition-colors text-slate-400 hover:translate-x-1 duration-200 transform inline-block text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <button
              onClick={openBookingModal}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-teal-900/40 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Schedule Evaluation</span>
            </button>
          </div>
        </div>

        {/* Col 4: Premium Newsletter Signup */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Care Insights</h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Subscribe to receive expert senior care tips, safety articles, and family support resources from our Registered Nurses.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-lg px-3.5 py-2.5 text-xs border border-slate-700 focus:outline-none focus:border-teal-500 transition-all pr-10"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1 text-teal-400 hover:text-white p-1.5 rounded-lg transition-colors top-1/2 -translate-y-1/2"
                >
                  {loading ? (
                    <span className="block border-2 border-teal-400 border-t-transparent animate-spin w-4 h-4 rounded-full" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">We care about your privacy. Unsubscribe anytime.</p>
            </form>
          ) : (
            <div className="bg-teal-950/40 border border-teal-800 p-4 rounded-xl text-xs flex items-start gap-2.5 text-teal-300">
              <div className="bg-teal-500 text-white p-0.5 rounded-full mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <div>
                <span className="font-bold block text-white">Subscription Saved!</span>
                You will now receive our clinical newsletter tips.
              </div>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>State Vetted Care Alliance</span>
          </div>
        </div>

      </div>

      {/* Copy line */}
      <div className="border-t border-slate-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          © 2026 Ambiance Joy Nursing Services, LLC. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Non-Discrimination Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Texas HHS Facility ID #7008</a>
        </div>
      </div>
    </footer>
  );
}
