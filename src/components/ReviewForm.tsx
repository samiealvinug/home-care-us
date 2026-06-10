import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { TestimonialItem } from '../types';

interface ReviewFormProps {
  onAddReview: (review: TestimonialItem) => void;
}

export default function ReviewForm({ onAddReview }: ReviewFormProps) {
  const [author, setAuthor] = useState('');
  const [relationship, setRelationship] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !quote) return;

    const newReview: TestimonialItem = {
      id: `user-test-${Date.now()}`,
      author,
      relationship: relationship || "Family Advocate",
      location: "Houston, TX",
      rating,
      quote,
      date: new Date().toISOString().split('T')[0]
    };

    onAddReview(newReview);
    setSuccess(true);
    setAuthor('');
    setRelationship('');
    setRating(5);
    setQuote('');
    setTimeout(() => setSuccess(false), 5000);
  };

  if (success) {
    return (
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 text-center space-y-2 animate-fade-in" id="review-success-state">
        <strong className="block text-xs font-bold text-teal-950">Review Posted Successfully!</strong>
        <p className="text-[11px] text-slate-600 leading-normal">
          Thank you! Your feedback helps other Houston families make confident decisions for in-home clinical care.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans" id="testimonial-review-placement-form">
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Your Full Name</label>
        <input 
          type="text" 
          required 
          placeholder="Deborah Vance"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Relationship to Patient</label>
        <input 
          type="text" 
          required 
          placeholder="Daughter of Client"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Overall Rating</label>
        <div className="flex gap-1.5 py-1">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <button
              key={starValue}
              type="button"
              onClick={() => setRating(starValue)}
              className="focus:outline-none cursor-pointer"
            >
              <Star 
                className={`w-5 h-5 transition-transform hover:scale-110 ${
                  starValue <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Your Story / Remarks</label>
        <textarea
          required
          rows={3}
          placeholder="Describe your caretaker matching, nurse communication, and daily peace of mind..."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="w-full text-xs font-medium border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 bg-slate-50/50 outline-none transition-all placeholder-slate-400 focus:bg-white resize-none"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-950 text-white font-bold py-3 px-6 rounded-xl text-[11px] uppercase tracking-wider transition-all hover:translate-y-[-1px] shadow-sm cursor-pointer"
      >
        Publish Public Review
      </button>
    </form>
  );
}
