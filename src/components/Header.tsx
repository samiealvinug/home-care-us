import React from 'react';
import { Phone, Mail, MapPin, Heart, Menu, X, Shield, Clock } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openBookingModal: () => void;
}

export default function Header({ activeTab, setActiveTab, openBookingModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { label: string; tab: ActiveTab }[] = [
    { label: 'Home', tab: 'Home' },
    { label: 'Services', tab: 'Services' },
    { label: 'About Us', tab: 'About' },
    { label: 'Success Stories', tab: 'Testimonials' },
    { label: 'Careers', tab: 'Careers' },
    { label: 'Contact', tab: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" id="premium-app-header">
      {/* Main Bar */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setActiveTab('Home'); setMobileMenuOpen(false); }}
            id="brand-logo"
          >
            <div className="bg-teal-500 text-white p-2.5 rounded-xl shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <Heart className="w-6 h-6 fill-teal-100/30" />
            </div>
            <div>
              <span className="block font-sans text-lg font-bold tracking-tight text-slate-900 leading-tight">
                Ambiance Joy
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-widest text-teal-600 font-bold leading-none">
                Nursing Services
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.tab
                    ? 'text-teal-600 bg-teal-50/50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Call Button */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="tel:8328147008"
              className="px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-slate-700 text-sm font-medium transition-all hover:bg-slate-50 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-slate-500" />
              <span>Call Intake</span>
            </a>
            <button
              onClick={openBookingModal}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md shadow-teal-600/15 hover:shadow-lg transition-all"
            >
              Book Free Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a 
              href="tel:8328147008"
              className="p-2.5 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-xl transition-all"
              title="Call immediately"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 shadow-xl overflow-hidden py-4 px-4 transition-all" id="mobile-menu-panel">
          <div className="grid gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.tab
                    ? 'text-teal-600 bg-teal-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-100 mt-3 pt-3 grid gap-2">
              <button
                onClick={() => {
                  openBookingModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-center py-2.5 rounded-lg text-sm transition-all shadow-md"
              >
                Book Free Consultation
              </button>
              <a 
                href="tel:8328147008"
                className="w-full border border-slate-200 text-slate-700 font-semibold text-center py-2.5 rounded-lg text-sm hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-4 h-4" /> (832) 814-7008
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
