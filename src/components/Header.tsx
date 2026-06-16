import React from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { ActiveTab } from '../types';
import Logo from './Logo';

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
      <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-cream-dark max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Custom SVG Logo Brand Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setActiveTab('Home'); setMobileMenuOpen(false); }}
            id="brand-logo"
          >
            <Logo type="inline" />
          </div>

          {/* Desktop Nav with brand colors */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === item.tab
                    ? 'text-brand-purple bg-brand-cream font-bold border-b-2 border-brand-purple'
                    : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Call Button with brand colors */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="tel:8325065024"
              className="px-4 py-2 border border-slate-200 hover:border-brand-cream-dark rounded-lg text-slate-700 text-sm font-semibold transition-all hover:bg-slate-50 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-teal" />
              <span>Call Intake</span>
            </a>
            <button
              onClick={openBookingModal}
              className="bg-brand-purple hover:bg-brand-purple/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-brand-purple/15 hover:shadow-lg transition-all cursor-pointer"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a 
              href="tel:8325065024"
              className="p-2.5 text-brand-teal bg-brand-cream hover:bg-brand-cream-dark border border-brand-cream-dark rounded-xl transition-all"
              title="Call immediately"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-brand-cream-dark shadow-xl overflow-hidden py-4 px-4 transition-all" id="mobile-menu-panel">
          <div className="grid gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === item.tab
                    ? 'text-brand-purple bg-brand-cream border-l-4 border-brand-purple font-extrabold'
                    : 'text-slate-700 hover:bg-brand-cream/50'
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
                className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-bold text-center py-2.5 rounded-lg text-sm transition-all shadow-md cursor-pointer"
              >
                Book Consultation
              </button>
              <a 
                href="tel:8325065024"
                className="w-full border border-slate-200 text-slate-700 font-semibold text-center py-2.5 rounded-lg text-sm hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-brand-teal" /> (832) 506-5024
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
