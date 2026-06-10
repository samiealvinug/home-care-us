import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Heart, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am Joy, your Lead Care Coordinator. How can we assist your families in finding skilled nursing or comfortable personal home care in Houston?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputInput, setInputInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (e: React.FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    const txt = presetMessage || inputInput.trim();
    if (!txt || sending) return;

    if (!presetMessage) setInputInput('');

    const newUserMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: txt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setSending(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: txt,
          history: historyPayload
        })
      });

      if (res.ok) {
        const data = await res.json();
        const modelMsg: ChatMessage = {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        throw new Error();
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `m-err-${Date.now()}`,
        role: 'model',
        text: "I want to make sure your family has direct answers. Our on-call nurse intake desk is available 24/7. Could you please call us directly at (832) 814-7008?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans" id="live-coordination-bubble-container">
      {open ? (
        <div className="bg-white border border-slate-100 w-[350px] max-w-[calc(100vw-32px)] h-[460px] rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-fade-in">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-teal-500 text-white p-2 rounded-lg">
                <Heart className="w-4.5 h-4.5 fill-white/10" />
              </div>
              <div className="text-left">
                <strong className="block text-xs font-bold leading-tight">Care Coordinator</strong>
                <span className="block text-[10px] text-teal-400 font-bold uppercase tracking-widest leading-none mt-1">Joy • Online</span>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-br-none font-medium' 
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-100 font-medium'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            {sending && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic bg-white px-3 py-2 border rounded-xl self-start">
                <span className="block border-2 border-teal-500 border-t-transparent animate-spin w-3 h-3 rounded-full" />
                <span>Joy is composing assistance options...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions panel */}
          <div className="px-3 py-1.5 border-t border-slate-100 flex gap-1 overflow-x-auto whitespace-nowrap bg-white text-[10px] shrink-0 scrollbar-none">
            {[
              "Medication management?",
              "Do you accept insurance?",
              "Cost per hour?",
              "Is Sarah Johnson on call?"
            ].map((pill) => (
              <button
                key={pill}
                onClick={(e) => handleSend(e, pill)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full border border-slate-200/50 transition-colors font-semibold cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form onSubmit={(e) => handleSend(e)} className="p-3 border-t bg-white flex gap-2 shrink-0">
            <input
              type="text"
              value={inputInput}
              onChange={(e) => setInputInput(e.target.value)}
              placeholder="Ask questions about services, hours, or rates..."
              className="flex-1 text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 font-sans font-medium"
            />
            <button 
              type="submit" 
              className="bg-teal-600 hover:bg-teal-700 text-white p-2.5 rounded-xl transition-colors shadow-sm shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setOpen(true)}
          className="bg-slate-900 hover:bg-slate-950 text-white p-4 rounded-full shadow-2xl transition-all scale-100 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 border border-slate-800 cursor-pointer"
          id="chat-floating-button"
        >
          <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-teal-400 px-2 py-0.5 rounded bg-teal-950/80">
            Intake Direct
          </span>
          <div className="relative">
            <MessageSquare className="w-5.5 h-5.5 shrink-0" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-slate-900 animate-pulse" />
          </div>
        </button>
      )}
    </div>
  );
}
