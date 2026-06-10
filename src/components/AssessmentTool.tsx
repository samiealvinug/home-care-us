import React, { useState } from 'react';
import { ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { MatchRecommendation } from '../types';

interface AssessmentToolProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function AssessmentTool({ onSelectService }: AssessmentToolProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    need: '',
    discharge: '',
    memory: '',
    hours: ''
  });
  const [result, setResult] = useState<MatchRecommendation | null>(null);

  const runEvaluation = () => {
    const { need, discharge, memory } = answers;
    let rxNursing = 30;
    let rxCompanion = 30;
    let rxPersonal = 30;
    let rxDementia = 30;

    if (need === 'clinical') rxNursing += 50;
    if (need === 'daily') rxPersonal += 50;
    if (need === 'social') rxCompanion += 50;
    if (need === 'memory') rxDementia += 50;

    if (memory === 'yes') {
      rxDementia += 40;
    }
    if (discharge === 'yes') {
      rxNursing += 30;
      rxPersonal += 20;
    }

    let recommended = 'Personal Care Assistance';
    let explanation = 'Based on your indications, your loved one would benefit immensely from daily, compassionate help with physical movement, hygiene, and household routines.';

    const max = Math.max(rxNursing, rxCompanion, rxPersonal, rxDementia);
    if (max === rxNursing) {
      recommended = 'Skilled Nursing';
      explanation = 'Your loved one requires expert registered clinical nurse visits to monitor vitals, manage healing wounds, or coordinate complex medications.';
    } else if (max === rxDementia) {
      recommended = "Dementia & Alzheimer's Care";
      explanation = 'We highly suggest memory-certified caregivers trained in safety, soothing validation methods, and calming behavioral routines.';
    } else if (max === rxCompanion) {
      recommended = 'Companion Care';
      explanation = 'Daily conversation, active mind games, accompanied walks, and secure transportation fits best to enrich cognitive vitality and peace of mind.';
    }

    setResult({
      scoreNursing: rxNursing,
      scoreCompanion: rxCompanion,
      scorePersonal: rxPersonal,
      scoreDementia: rxDementia,
      recommendedService: recommended,
      explanation
    });
    setStep(2);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ need: '', discharge: '', memory: '', hours: '' });
    setResult(null);
  };

  return (
    <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100 flex flex-col justify-between font-sans min-h-[360px]" id="care-assessment-tool-widget">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
            Interactive Helper
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">Care Assessment Matcher</h3>
        <p className="text-xs text-slate-400 mt-1 leading-normal mb-5">
          Answer simple questions to determine the safest care track and matched caretakers for your relative.
        </p>

        {step === 0 && (
          <div className="space-y-2 animate-fade-in">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Where is support needed most?</span>
            <div className="grid gap-1.5">
              {[
                { key: 'clinical', label: 'Clinical, wounds, or nurse checks' },
                { key: 'daily', label: 'Bathing, meal prep, and mobility assistance' },
                { key: 'social', label: 'Companion visits & secure outings' },
                { key: 'memory', label: 'Memory issues or cognitive routines' }
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setAnswers(prev => ({ ...prev, need: opt.key }));
                    setStep(1);
                  }}
                  className="w-full text-left p-3 border border-slate-100 hover:border-teal-500 rounded-xl hover:bg-teal-50/20 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Has your loved one recently left a hospital?</label>
              <div className="grid grid-cols-2 gap-2">
                {['yes', 'no'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAnswers(prev => ({ ...prev, discharge: val }))}
                    className={`py-2 rounded-xl text-xs font-bold uppercase border transition-all cursor-pointer ${
                      answers.discharge === val 
                        ? 'border-teal-600 bg-teal-600 text-white' 
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {val === 'yes' ? 'Yes, recently' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Are memory loss or wandering an active concern?</label>
              <div className="grid grid-cols-2 gap-2">
                {['yes', 'no'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAnswers(prev => ({ ...prev, memory: val }))}
                    className={`py-2 rounded-xl text-xs font-bold uppercase border transition-all cursor-pointer ${
                      answers.memory === val 
                        ? 'border-teal-600 bg-teal-600 text-white' 
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {val === 'yes' ? 'Yes, active' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!answers.discharge || !answers.memory}
                onClick={runEvaluation}
                className="bg-slate-900 border border-slate-800 text-white font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all disabled:opacity-40 select-none cursor-pointer"
              >
                Match Programs
              </button>
            </div>
          </div>
        )}

        {step === 2 && result && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-1.5 text-left">
              <span className="text-[9px] uppercase tracking-wider font-bold text-teal-700 block">Recommended Focus Area</span>
              <strong className="text-sm font-black text-slate-900 block">{result.recommendedService}</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed pt-1 font-medium">{result.explanation}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => onSelectService(result.recommendedService)}
                className="bg-slate-900 hover:bg-slate-950 text-white py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-colors cursor-pointer"
              >
                Select Program
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 border border-slate-200 text-slate-700 py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry Match</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
