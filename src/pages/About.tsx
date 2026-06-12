import React from 'react';
import { Award } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in py-12 px-4 max-w-5xl mx-auto space-y-12" id="about-tab-screen">
      
      {/* Intro section with side-by-side illustration */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch text-left">
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="block text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">Our History</span>
            <h1 className="text-3xl md:text-4xl font-serif text-brand-navy leading-tight">Welcome to Ambiance Joy</h1>
            <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-normal">
              Ambiance Joy Nursing Services is a premier care home dedicated to outstanding clinical nursing and residential support living. We believe that every individual has distinct physical, spiritual, and emotional needs, and our caregivers provide customized assistance designed to promote safety, respect, and independence.
            </p>
          </div>

          <div className="space-y-4">
            {/* Mission */}
            <div className="bg-[#0a2540] border-l-4 border-brand-teal p-5 rounded-xl text-white">
              <span className="block text-xs font-bold text-brand-teal uppercase tracking-widest font-mono mb-1">Our Mission</span>
              <p className="text-xs sm:text-sm italic font-normal leading-relaxed">
                "To provide exceptional nursing and residential care that promotes health, dignity, comfort, and joy for every individual we serve."
              </p>
            </div>

            {/* Vision */}
            <div className="bg-brand-cream border-l-4 border-brand-purple p-5 rounded-xl text-slate-800 border-y border-brand-cream-dark">
              <span className="block text-xs font-bold text-brand-purple uppercase tracking-widest font-mono mb-1">Our Vision</span>
              <p className="text-xs sm:text-sm italic font-normal leading-relaxed text-slate-650">
                "To be a leading provider of compassionate care services, recognized across Texas for excellence, safety, and a real heart-centered impact on residents and their families."
              </p>
            </div>
          </div>
        </div>

        {/* Brand visual image and Texas license block */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-brand-cream-dark min-h-[400px] flex items-end">
          <img 
            src="https://images.unsplash.com/photo-1576765608622-46748db38e75?auto=format&fit=crop&q=80&w=1000" 
            alt="Compassionate senior care by Ambiance Joy" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="relative z-10 p-6 sm:p-8 text-white space-y-4 text-left">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-brand-teal bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-full inline-block">
              Licensed & Registered Facility
            </span>
            
            <p className="text-slate-100 text-xs sm:text-sm italic leading-relaxed font-normal">
              “Because every person deserves to feel at home, cared for, and valued"
            </p>

            <div className="pt-2 border-t border-white/15 flex items-center gap-2 text-xs text-white/95 font-bold">
              <Award className="w-5 h-5 text-brand-teal" />
              <span>Texas Health and Human Services Registered • ID #7008</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Care values display */}
      <section className="space-y-8 bg-brand-cream/40 p-8 sm:p-12 rounded-3xl border border-brand-cream-dark shadow-sm">
        <div className="text-center space-y-1">
          <span className="block text-xs font-bold text-brand-purple uppercase tracking-widest font-mono2">Our Principles</span>
          <h2 className="text-2xl font-serif text-brand-navy leading-tight">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Compassion", desc: "Providing care with deep empathy, warmth, sensitivity, and kind emotional security." },
            { title: "Respect", desc: "Honoring individual choices, promoting daily independence, and safeguarding personal privacy." },
            { title: "Integrity", desc: "Adhering to high ethical standards, transparency, and complete clinical honesty." },
            { title: "Excellence", desc: "Committed to delivering outstanding standards of nursing and supportive residential living." },
            { title: "Professionalism", desc: "Developing highly trained, vetted caregivers and qualified care practitioners." },
            { title: "Dignity", desc: "Ensuring every single person feels deeply valued, respected, and treated with utmost honor." }
          ].map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-left space-y-2">
              <span className="font-mono text-xs text-brand-purple font-bold opacity-60">0{i+1}</span>
              <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider block">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-normal font-normal">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
