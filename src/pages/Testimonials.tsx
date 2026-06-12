import React from 'react';
import { Star } from 'lucide-react';
import { TestimonialItem } from '../types';
import ReviewForm from '../components/ReviewForm';

interface TestimonialsProps {
  testimonialsList: TestimonialItem[];
  onAddReview: (newReview: TestimonialItem) => void;
}

export default function Testimonials({ testimonialsList, onAddReview }: TestimonialsProps) {
  return (
    <div className="animate-fade-in py-12 px-4 max-w-5xl mx-auto space-y-12" id="testimonials-tab-screen">
      <div className="text-center max-w-xl mx-auto space-y-2 col-span-full">
        <span className="block text-xs font-bold text-brand-purple uppercase tracking-widest font-mono">Client Experiences</span>
        <h1 className="text-3xl md:text-4xl font-serif text-brand-navy leading-tight">Verified Community Success Stories</h1>
        <p className="text-slate-500 text-xs sm:text-sm">Read genuine remarks shared by families, guardians, and clinical coordinators in Houston.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Star reviews listing */}
        <div className="lg:col-span-8 space-y-5 text-left">
          {testimonialsList.map((test) => (
            <div key={test.id} className="bg-white rounded-2xl p-5 border border-brand-cream-dark shadow-md space-y-3 hover:border-brand-teal/20 transition-all">
              <div className="flex justify-between items-center">
                <div className="flex gap-0.5">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">{test.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-normal">
                "{test.quote}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-brand-cream/80 text-[11px] gap-2">
                <div>
                  <strong className="block text-brand-navy font-bold text-xs">{test.author}</strong>
                  <span className="text-slate-400 block mt-0.5 text-[10px] uppercase font-mono font-bold">{test.relationship}</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-teal bg-brand-cream border border-brand-cream-dark px-2.5 py-0.5 rounded font-bold">
                  {test.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Submit feedback sidebar form */}
        <div className="lg:col-span-4 bg-brand-cream border border-brand-cream-dark rounded-2xl p-5 shadow-sm space-y-4 text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider font-mono">Add Your Experience</h3>
            <p className="text-xs text-slate-500 leading-normal font-sans">Your positive validation assists other Houston families in selecting residential care options with absolute confidence.</p>
          </div>
          <ReviewForm onAddReview={onAddReview} />
        </div>

      </div>
    </div>
  );
}
